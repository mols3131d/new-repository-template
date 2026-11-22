import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const safeIdentifierPattern = /^(?:[a-z0-9][a-z0-9-]*|\*)$/iu;

export type AgentCommand =
  | "setup"
  | "restore"
  | "refresh"
  | "check"
  | "preview"
  | "retire";

export interface RulesyncSelection {
  targets: string[];
  features: string[];
}

export interface CommandResult {
  status: number;
  error?: Error;
}

export type CommandRunner = (
  command: string,
  args: string[],
  cwd: string,
) => CommandResult;

export interface AgentCliDeps {
  runCommand?: CommandRunner;
  env?: NodeJS.ProcessEnv;
  stdout?: (line: string) => void;
  stderr?: (line: string) => void;
}

const installArgsByCommand = {
  setup: ["install"],
  restore: ["install", "--frozen"],
  refresh: ["install", "--update"],
} as const;

const helpText = [
  "Usage: node scripts/manage-agent-assets.ts <command> [--root DIRECTORY]",
  "       node scripts/manage-agent-assets.ts retire <targets> --features <features> [--apply] [--root DIRECTORY]",
  "",
  "Commands:",
  "  setup     Install skills, generate projections, and sync ignores",
  "  restore   Frozen install from rulesync.lock, generate, and sync ignores",
  "  refresh   Update upstream skills, generate projections, and sync ignores",
  "  check     Read-only: run rulesync doctor --strict",
  "  preview   Read-only: run check and dry-run generation (needs .rulesync)",
  "  retire    Preview retired target/feature cleanup; --apply to delete",
  "",
  "Options:",
  "  --root DIRECTORY  Repository root (default: repo root)",
  "  --features LIST   Explicit retired features, comma-separated (retire only)",
  "  --apply           Perform deletion and resync ignores (retire only)",
  "  -h, --help        Show this help (exit 0)",
  "",
  "Exit codes: 0 ok, 1 rulesync or config error, 2 invalid arguments",
].join("\n");

/**
 * Strip JSONC comments and trailing commas outside string literals.
 */
export function stripJsonc(raw: string): string {
  const withoutComments = raw
    .replace(/^\uFEFF/, "")
    .replace(/"(?:\\.|[^"\\])*"|\/\/[^\r\n]*|\/\*[\s\S]*?\*\//gu, (match) =>
      match.startsWith('"') ? match : "",
    );
  return withoutComments.replace(
    /"(?:\\.|[^"\\])*"|,(?=\s*[}\]])/gu,
    (match) => (match.startsWith('"') ? match : ""),
  );
}

function readJsoncObject(path: string): Record<string, unknown> {
  const parsed: unknown = JSON.parse(stripJsonc(readFileSync(path, "utf8")));
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${path}: configuration must be a JSON object`);
  }
  return parsed as Record<string, unknown>;
}

function uniqueSafeIdentifiers(
  values: unknown,
  kind: string,
  sourcePath: string,
): string[] {
  if (!Array.isArray(values)) {
    throw new Error(`${sourcePath}: expected '${kind}' list`);
  }
  const unique: string[] = [];
  const seen = new Set<string>();
  for (const item of values) {
    if (typeof item !== "string" || !safeIdentifierPattern.test(item)) {
      throw new Error(
        `${sourcePath}: invalid ${kind} identifier '${String(item)}'`,
      );
    }
    if (!seen.has(item)) {
      seen.add(item);
      unique.push(item);
    }
  }
  if (unique.length === 0) {
    throw new Error(`${sourcePath}: no ${kind}s configured`);
  }
  return unique;
}

function collectTargetFeatures(spec: unknown): unknown[] {
  if (Array.isArray(spec)) {
    return spec;
  }
  if (spec !== null && typeof spec === "object") {
    return Object.entries(spec as Record<string, unknown>)
      .filter(
        ([key, val]) =>
          key !== "gitignoreDestination" &&
          (val === true ||
            (val !== null && typeof val === "object" && !Array.isArray(val))),
      )
      .map(([key]) => key);
  }
  return [];
}

/**
 * Derive --targets and --features for `rulesync gitignore` from rulesync.jsonc.
 * Rulesync accepts one shared feature filter, so the union is the narrowest
 * CLI approximation of per-target features; review shared ignored paths.
 */
export function parseRulesyncSelection(root: string): RulesyncSelection {
  const configPath = join(root, "rulesync.jsonc");
  if (!existsSync(configPath)) {
    throw new Error(`${configPath}: Rulesync configuration file not found`);
  }

  const baseConfig = readJsoncObject(configPath);
  const localPath = join(root, "rulesync.local.jsonc");
  const localConfig = existsSync(localPath) ? readJsoncObject(localPath) : {};

  const targetsSource =
    localConfig.targets !== undefined ? localPath : configPath;
  const featuresSource =
    localConfig.features !== undefined ? localPath : configPath;
  const rawTargets = localConfig.targets ?? baseConfig.targets;
  const rawFeatures = localConfig.features ?? baseConfig.features;

  if (Array.isArray(rawTargets)) {
    const targets = uniqueSafeIdentifiers(rawTargets, "target", targetsSource);
    const features =
      rawFeatures !== undefined
        ? uniqueSafeIdentifiers(rawFeatures, "feature", featuresSource)
        : ["rules"];
    return { targets, features };
  }

  if (rawTargets === null || typeof rawTargets !== "object") {
    throw new Error(
      `${targetsSource}: 'targets' must be an array or per-target object`,
    );
  }

  const targets = uniqueSafeIdentifiers(
    Object.keys(rawTargets),
    "target",
    targetsSource,
  );
  const features = uniqueSafeIdentifiers(
    Object.values(rawTargets as Record<string, unknown>).flatMap(
      collectTargetFeatures,
    ),
    "feature",
    targetsSource,
  );
  return { targets, features };
}

/**
 * Execute an external CLI command without DEP0190 shell-args warnings on Windows.
 */
export const defaultRunner: CommandRunner = (command, args, cwd) => {
  const result =
    process.platform === "win32"
      ? spawnSync(
          process.env.ComSpec || "cmd.exe",
          ["/d", "/c", command, ...args],
          { cwd, stdio: "inherit" },
        )
      : spawnSync(command, args, { cwd, stdio: "inherit" });

  if (result.error) {
    return { status: 1, error: result.error };
  }
  return { status: result.status ?? 1 };
};

function runRulesyncStep(
  runCommand: CommandRunner,
  args: string[],
  root: string,
  stderr: (line: string) => void,
): number {
  const result = runCommand("rulesync", args, root);
  if (result.error) {
    stderr(`Failed to execute rulesync: ${result.error.message}`);
  }
  return result.status;
}

function reportInstallFailure(
  root: string,
  command: keyof typeof installArgsByCommand,
  env: NodeJS.ProcessEnv,
  stderr: (line: string) => void,
): void {
  const hasLock = existsSync(join(root, "rulesync.lock"));
  if (
    !env.GITHUB_TOKEN &&
    !env.GH_TOKEN &&
    (command !== "restore" || hasLock)
  ) {
    stderr(
      "Hint: unauthenticated GitHub requests can hit API rate limits; set GITHUB_TOKEN or GH_TOKEN (e.g. from 'gh auth token') before retrying.",
    );
  }
  if ((command === "setup" || command === "refresh") && hasLock) {
    const retry =
      command === "setup" ? "mise run setup" : "mise run agents-refresh";
    stderr(
      `Warning: rulesync.lock may reflect a partial install; rerun '${retry}' rather than trusting it or using 'agents-restore'.`,
    );
  }
}

type ParsedCliArgs =
  | { kind: "help" }
  | { kind: "run"; command: Exclude<AgentCommand, "retire">; root: string }
  | {
      kind: "retire";
      root: string;
      targets: string;
      features: string;
      apply: boolean;
    };

function parseRetireList(raw: string): string | null {
  const values = raw.split(",");
  if (
    values.some((value) => value === "*" || !safeIdentifierPattern.test(value))
  ) {
    return null;
  }
  return [...new Set(values)].join(",");
}

function parseCliArgs(
  args: string[],
  defaultRepoRoot: string,
): ParsedCliArgs | null {
  if (args.includes("--help") || args.includes("-h")) {
    return { kind: "help" };
  }

  let command: AgentCommand | undefined;
  let root = defaultRepoRoot;
  let retireTargets: string | undefined;
  let retireFeatures: string | undefined;
  let apply = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--root") {
      const value = args[i + 1];
      if (!value || value.startsWith("-")) {
        return null;
      }
      root = resolve(value);
      i++;
    } else if (
      arg === "--features" &&
      command === "retire" &&
      retireFeatures === undefined
    ) {
      const value = args[i + 1];
      if (!value || value.startsWith("-")) {
        return null;
      }
      retireFeatures = value;
      i++;
    } else if (arg === "--apply" && command === "retire" && !apply) {
      apply = true;
    } else if (
      !arg.startsWith("-") &&
      !command &&
      (arg === "setup" ||
        arg === "restore" ||
        arg === "refresh" ||
        arg === "check" ||
        arg === "preview" ||
        arg === "retire")
    ) {
      command = arg;
    } else if (
      command === "retire" &&
      retireTargets === undefined &&
      !arg.startsWith("-")
    ) {
      retireTargets = arg;
    } else {
      return null;
    }
  }

  if (command === "retire") {
    const targets = retireTargets && parseRetireList(retireTargets);
    const features = retireFeatures && parseRetireList(retireFeatures);
    return targets && features
      ? { kind: "retire", root, targets, features, apply }
      : null;
  }
  return command ? { kind: "run", command, root } : null;
}

/**
 * Run the agent dependency and projection workflow CLI.
 */
export function main(
  args: string[] = process.argv.slice(2),
  defaultRepoRoot: string = defaultRoot,
  deps: AgentCliDeps = {},
): number {
  const runCommand = deps.runCommand ?? defaultRunner;
  const env = deps.env ?? process.env;
  const stdout = deps.stdout ?? ((line: string) => console.log(line));
  const stderr = deps.stderr ?? ((line: string) => console.error(line));

  const parsed = parseCliArgs(args, defaultRepoRoot);
  if (!parsed) {
    stderr(
      "Usage: node scripts/manage-agent-assets.ts <setup|restore|refresh|check|preview> [--root DIRECTORY] or retire <targets> --features <features> [--apply]",
    );
    return 2;
  }
  if (parsed.kind === "help") {
    stdout(helpText);
    return 0;
  }

  const { root } = parsed;

  if (parsed.kind === "retire") {
    // Check the active configuration before making any destructive change.
    let selection: RulesyncSelection | undefined;
    if (parsed.apply) {
      try {
        selection = parseRulesyncSelection(root);
      } catch (error) {
        stderr(error instanceof Error ? error.message : String(error));
        return 1;
      }
    }

    const status = runRulesyncStep(
      runCommand,
      [
        "generate",
        "--retire-targets",
        parsed.targets,
        "--features",
        parsed.features,
        ...(parsed.apply ? [] : ["--dry-run", "--json"]),
      ],
      root,
      stderr,
    );
    if (status !== 0 || !selection) {
      return status;
    }
    return runRulesyncStep(
      runCommand,
      [
        "gitignore",
        "--targets",
        selection.targets.join(","),
        "--features",
        selection.features.join(","),
      ],
      root,
      stderr,
    );
  }

  const { command } = parsed;
  if (command === "check") {
    return runRulesyncStep(runCommand, ["doctor", "--strict"], root, stderr);
  }
  if (command === "preview") {
    return (
      runRulesyncStep(runCommand, ["doctor", "--strict"], root, stderr) ||
      runRulesyncStep(
        runCommand,
        ["generate", "--dry-run", "--json"],
        root,
        stderr,
      )
    );
  }

  let selection: RulesyncSelection;
  try {
    selection = parseRulesyncSelection(root);
  } catch (error) {
    stderr(error instanceof Error ? error.message : String(error));
    return 1;
  }

  const installStatus = runRulesyncStep(
    runCommand,
    [...installArgsByCommand[command]],
    root,
    stderr,
  );
  if (installStatus !== 0) {
    reportInstallFailure(root, command, env, stderr);
    return installStatus;
  }

  return (
    runRulesyncStep(runCommand, ["generate"], root, stderr) ||
    runRulesyncStep(
      runCommand,
      [
        "gitignore",
        "--targets",
        selection.targets.join(","),
        "--features",
        selection.features.join(","),
      ],
      root,
      stderr,
    )
  );
}

const isDirectRun =
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isDirectRun) {
  process.exitCode = main();
}
