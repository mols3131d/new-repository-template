import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const safeIdentifierPattern = /^(?:[a-z0-9-]+|\*)$/iu;

export type AgentCommand =
  | "setup"
  | "restore"
  | "refresh"
  | "check"
  | "preview";

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

/**
 * Strip JSONC comments and trailing commas outside string literals.
 */
export function stripJsonc(raw: string): string {
  const withoutBom = raw.replace(/^\uFEFF/, "");
  let noComments = "";
  let inString = false;
  let escaped = false;

  for (let i = 0; i < withoutBom.length; i++) {
    const ch = withoutBom[i];
    const next = withoutBom[i + 1];

    if (inString) {
      noComments += ch;
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      noComments += ch;
      continue;
    }

    if (ch === "/" && next === "/") {
      i += 2;
      while (i < withoutBom.length && withoutBom[i] !== "\n") {
        i++;
      }
      if (i < withoutBom.length && withoutBom[i] === "\n") {
        noComments += "\n";
      }
      continue;
    }

    if (ch === "/" && next === "*") {
      const end = withoutBom.indexOf("*/", i + 2);
      if (end === -1) {
        throw new Error("Unterminated block comment in JSONC configuration");
      }
      const segment = withoutBom.slice(i, end + 2);
      for (const char of segment) {
        if (char === "\n") {
          noComments += "\n";
        }
      }
      i = end + 1;
      continue;
    }

    noComments += ch;
  }

  let cleaned = "";
  inString = false;
  escaped = false;

  for (let i = 0; i < noComments.length; i++) {
    const ch = noComments[i];

    if (inString) {
      cleaned += ch;
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      cleaned += ch;
      continue;
    }

    if (ch === ",") {
      let lookahead = i + 1;
      while (
        lookahead < noComments.length &&
        /\s/u.test(noComments[lookahead])
      ) {
        lookahead++;
      }
      const nextToken = noComments[lookahead];
      if (nextToken === "}" || nextToken === "]") {
        continue;
      }
    }

    cleaned += ch;
  }

  return cleaned;
}

function readJsoncObject(path: string): Record<string, unknown> {
  const parsed: unknown = JSON.parse(stripJsonc(readFileSync(path, "utf8")));
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${path}: configuration must be a JSON object`);
  }
  return parsed as Record<string, unknown>;
}

function validateIdentifiers(
  values: string[],
  kind: string,
  sourcePath: string,
): string[] {
  const unique: string[] = [];
  const seen = new Set<string>();
  for (const item of values) {
    if (!safeIdentifierPattern.test(item)) {
      throw new Error(`${sourcePath}: invalid ${kind} identifier '${item}'`);
    }
    if (!seen.has(item)) {
      seen.add(item);
      unique.push(item);
    }
  }
  return unique;
}

/**
 * Extract Rulesync targets and enabled features from rulesync.jsonc (and optional rulesync.local.jsonc).
 */
export function parseRulesyncSelection(root: string): RulesyncSelection {
  const configPath = join(root, "rulesync.jsonc");
  if (!existsSync(configPath)) {
    throw new Error(`${configPath}: Rulesync configuration file not found`);
  }

  const baseConfig = readJsoncObject(configPath);
  const localPath = join(root, "rulesync.local.jsonc");
  const localConfig = existsSync(localPath) ? readJsoncObject(localPath) : {};

  const rawTargets = localConfig.targets ?? baseConfig.targets;
  const rawFeatures = localConfig.features ?? baseConfig.features;

  if (Array.isArray(rawTargets)) {
    if (!rawTargets.every((item) => typeof item === "string")) {
      throw new Error(`${configPath}: 'targets' array entries must be strings`);
    }
    const targets = validateIdentifiers(rawTargets, "target", configPath);
    if (targets.length === 0) {
      throw new Error(`${configPath}: 'targets' must not be empty`);
    }

    let features = ["*"];
    if (rawFeatures !== undefined) {
      if (
        !Array.isArray(rawFeatures) ||
        !rawFeatures.every((item) => typeof item === "string")
      ) {
        throw new Error(
          `${configPath}: 'features' must be an array of strings`,
        );
      }
      features = validateIdentifiers(rawFeatures, "feature", configPath);
    }
    return {
      targets,
      features: features.length > 0 ? features : ["*"],
    };
  }

  if (
    rawTargets === null ||
    typeof rawTargets !== "object" ||
    Array.isArray(rawTargets)
  ) {
    throw new Error(
      `${configPath}: 'targets' must be an array or per-target object`,
    );
  }

  const targetEntries = Object.entries(rawTargets as Record<string, unknown>);
  const targets = validateIdentifiers(
    targetEntries.map(([name]) => name),
    "target",
    configPath,
  );
  if (targets.length === 0) {
    throw new Error(`${configPath}: 'targets' must not be empty`);
  }

  const collectedFeatures: string[] = [];
  for (const [targetName, spec] of targetEntries) {
    if (Array.isArray(spec)) {
      for (const entry of spec) {
        if (typeof entry !== "string") {
          throw new Error(
            `${configPath}: feature entry for '${targetName}' must be a string`,
          );
        }
        collectedFeatures.push(entry);
      }
      continue;
    }

    if (spec !== null && typeof spec === "object") {
      for (const [key, value] of Object.entries(
        spec as Record<string, unknown>,
      )) {
        if (key === "gitignoreDestination") {
          continue;
        }
        const enabled =
          value === true || (value !== null && typeof value === "object");
        if (enabled) {
          collectedFeatures.push(key);
        }
      }
      continue;
    }

    throw new Error(
      `${configPath}: target '${targetName}' must be a feature array or object`,
    );
  }

  const features = validateIdentifiers(
    collectedFeatures,
    "feature",
    configPath,
  );
  if (features.length === 0) {
    throw new Error(`${configPath}: no enabled features found in 'targets'`);
  }

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

function reportInstallFailure(
  root: string,
  command: "setup" | "restore" | "refresh",
  env: NodeJS.ProcessEnv,
  stderr: (line: string) => void,
): void {
  const hasToken = Boolean(env.GITHUB_TOKEN || env.GH_TOKEN);
  if (!hasToken) {
    stderr(
      "Hint: unauthenticated GitHub requests can hit API rate limits; set GITHUB_TOKEN or GH_TOKEN (e.g. from an authorized 'gh auth token' session) before retrying.",
    );
  }
  if (command !== "restore" && existsSync(join(root, "rulesync.lock"))) {
    stderr(
      "Warning: rulesync.lock may reflect a partial install; rerun 'mise run setup' (or 'mise run agents-refresh') rather than trusting it or using 'agents-restore'.",
    );
  }
}

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

const helpText = [
  "Usage: node scripts/manage-agent-assets.ts <command> [--root DIRECTORY]",
  "",
  "Commands:",
  "  setup     Install skills, generate projections, and sync ignores",
  "  restore   Frozen install from rulesync.lock, generate, and sync ignores",
  "  refresh   Update upstream skills, generate projections, and sync ignores",
  "  check     Read-only: run rulesync doctor --strict",
  "  preview   Read-only: run check and dry-run generation (needs .rulesync)",
  "",
  "Options:",
  "  --root DIRECTORY  Repository root (default: repo root)",
  "  -h, --help        Show this help (exit 0)",
  "",
  "Exit codes: 0 ok, 1 preflight or rulesync error, 2 invalid arguments",
].join("\n");

function printUsage(write: (line: string) => void): void {
  write(
    "Usage: node scripts/manage-agent-assets.ts <setup|restore|refresh|check|preview> [--root DIRECTORY]",
  );
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

  if (args.includes("--help") || args.includes("-h")) {
    stdout(helpText);
    return 0;
  }

  let command: AgentCommand | undefined;
  let root = defaultRepoRoot;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--root") {
      const value = args[i + 1];
      if (!value || value.startsWith("--")) {
        printUsage(stderr);
        return 2;
      }
      root = resolve(value);
      i++;
    } else if (arg.startsWith("--")) {
      printUsage(stderr);
      return 2;
    } else if (
      !command &&
      (arg === "setup" ||
        arg === "restore" ||
        arg === "refresh" ||
        arg === "check" ||
        arg === "preview")
    ) {
      command = arg;
    } else {
      printUsage(stderr);
      return 2;
    }
  }

  if (!command) {
    printUsage(stderr);
    return 2;
  }

  if (command === "check") {
    return runRulesyncStep(runCommand, ["doctor", "--strict"], root, stderr);
  }

  if (command === "preview") {
    const doctorStatus = runRulesyncStep(
      runCommand,
      ["doctor", "--strict"],
      root,
      stderr,
    );
    if (doctorStatus !== 0) {
      return doctorStatus;
    }
    if (!existsSync(join(root, ".rulesync"))) {
      stderr(
        ".rulesync does not exist yet. Run 'mise run setup' (or 'mise run agents-restore' when rulesync.lock is present) first.",
      );
      return 1;
    }
    return runRulesyncStep(runCommand, ["generate", "--dry-run"], root, stderr);
  }

  let selection: RulesyncSelection;
  try {
    selection = parseRulesyncSelection(root);
  } catch (error) {
    stderr(error instanceof Error ? error.message : String(error));
    return 1;
  }

  if (command === "restore" && !existsSync(join(root, "rulesync.lock"))) {
    stderr(
      "rulesync.lock not found. Run 'mise run setup' to generate and review the initial lockfile before running agents-restore.",
    );
    return 1;
  }

  const installArgs =
    command === "restore"
      ? ["install", "--frozen"]
      : command === "refresh"
        ? ["install", "--update"]
        : ["install"];

  const installStatus = runRulesyncStep(runCommand, installArgs, root, stderr);
  if (installStatus !== 0) {
    reportInstallFailure(root, command, env, stderr);
    return installStatus;
  }

  const generateStatus = runRulesyncStep(
    runCommand,
    ["generate"],
    root,
    stderr,
  );
  if (generateStatus !== 0) {
    return generateStatus;
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

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  process.exitCode = main();
}
