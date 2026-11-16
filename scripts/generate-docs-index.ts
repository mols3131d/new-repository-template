import {
  existsSync,
  lstatSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseDocument } from "yaml";

const docsDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../docs",
);
const excludedFiles = new Set(["README.md", "AGENTS.md", "SKILL.md"]);

export function descriptionFrom(path: string): string {
  const lines = readFileSync(path, "utf8")
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/);

  if (lines[0] !== "---") {
    throw new Error(`${path}: missing YAML frontmatter`);
  }
  const closing = lines.indexOf("---", 1);
  if (closing === -1) {
    throw new Error(`${path}: unclosed YAML frontmatter`);
  }

  const document = parseDocument(lines.slice(1, closing).join("\n"));
  if (document.errors.length > 0) {
    throw new Error(
      `${path}: invalid YAML frontmatter: ${document.errors[0].message}`,
    );
  }
  const metadata: unknown = document.toJS();
  if (
    metadata === null ||
    typeof metadata !== "object" ||
    Array.isArray(metadata) ||
    typeof (metadata as Record<string, unknown>).description !== "string"
  ) {
    throw new Error(`${path}: frontmatter must contain a string description`);
  }

  const description = (
    (metadata as Record<string, unknown>).description as string
  )
    .split(/\s+/u)
    .filter(Boolean)
    .join(" ");
  if (!description) {
    throw new Error(`${path}: empty frontmatter description`);
  }
  return description;
}

function tsvCell(value: string): string {
  return /["\t\r\n]/u.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

export function renderIndex(docs: string, maxDepth = 1): string {
  if (!existsSync(docs) || !lstatSync(docs).isDirectory()) {
    throw new Error(`${docs}: documentation directory does not exist`);
  }

  const entries: Array<[string, string]> = [];
  const visit = (directory: string, depth: number): void => {
    for (const name of readdirSync(directory).sort()) {
      const path = join(directory, name);
      const stat = lstatSync(path);
      if (stat.isSymbolicLink()) {
        throw new Error(`${path}: symlinks are not indexed`);
      }

      if (stat.isDirectory()) {
        const readme = join(path, "README.md");
        if (existsSync(readme) && lstatSync(readme).isFile()) {
          entries.push([
            `${relative(docs, path).split(sep).join("/")}/`,
            descriptionFrom(readme),
          ]);
        }
        if (depth + 1 < maxDepth) {
          visit(path, depth + 1);
        }
      } else if (
        stat.isFile() &&
        name.endsWith(".md") &&
        !excludedFiles.has(name) &&
        !name.startsWith("__")
      ) {
        entries.push([
          relative(docs, path).split(sep).join("/"),
          descriptionFrom(path),
        ]);
      }
    }
  };
  visit(docs, 0);

  entries.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  return (
    "path\tdescription\n" +
    entries
      .map(
        ([path, description]) => `${tsvCell(path)}\t${tsvCell(description)}\n`,
      )
      .join("")
  );
}

export function syncIndex(
  docs: string,
  check: boolean,
  maxDepth = 1,
): "current" | "updated" {
  const generated = renderIndex(docs, maxDepth);
  // A shallow index still requires valid metadata, including the root entrypoint.
  if (check) {
    const entrypoint = join(docs, "README.md");
    if (existsSync(entrypoint)) {
      if (lstatSync(entrypoint).isSymbolicLink()) {
        throw new Error(`${entrypoint}: symlinks are not indexed`);
      }
      descriptionFrom(entrypoint);
    }
    if (Number.isFinite(maxDepth)) {
      renderIndex(docs, Number.POSITIVE_INFINITY);
    }
  }
  const target = join(docs, "INDEX.tsv");
  const current = existsSync(target) ? readFileSync(target, "utf8") : null;

  if (generated === current) {
    return "current";
  }
  if (check) {
    throw new Error(
      `${target}: INDEX.tsv is missing or stale; regenerate the index`,
    );
  }
  writeFileSync(target, generated, "utf8");
  return "updated";
}

const helpText = [
  "Usage:",
  "  node scripts/generate-docs-index.ts [--root DIRECTORY] [--depth N|all] [--check]",
  "  node scripts/generate-docs-index.ts --validate FILE...",
  "",
  "Options:",
  "  --root DIRECTORY  Docs root (default: docs/)",
  "  --depth N|all     Index depth (default: 1)",
  "  --check           Read-only: fail if INDEX.tsv is missing/stale or metadata invalid",
  "  --validate FILE   Read-only: validate YAML frontmatter in named files",
  "  -h, --help        Show this help (exit 0)",
  "",
  "Exit codes: 0 ok, 1 validation/drift error, 2 invalid arguments",
].join("\n");

export function main(
  args: string[] = process.argv.slice(2),
  defaultRoot: string = docsDirectory,
): number {
  if (args.includes("--help") || args.includes("-h")) {
    console.log(helpText);
    return 0;
  }

  if (args[0] === "--validate") {
    if (args.length < 2 || args.slice(1).some((arg) => arg.startsWith("--"))) {
      console.error(
        "Usage: node scripts/generate-docs-index.ts --validate FILE...",
      );
      return 2;
    }
    try {
      for (const path of args.slice(1)) {
        descriptionFrom(resolve(path));
      }
      console.log(`Validated frontmatter in ${args.length - 1} file(s)`);
      return 0;
    } catch (error) {
      console.error(
        `Frontmatter validation failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      return 1;
    }
  }

  let root = defaultRoot;
  let depth = 1;
  let check = false;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--check") {
      check = true;
    } else if (
      arg === "--root" &&
      args[i + 1] &&
      !args[i + 1].startsWith("--")
    ) {
      root = resolve(args[++i]);
    } else if (
      arg === "--depth" &&
      args[i + 1] &&
      !args[i + 1].startsWith("--")
    ) {
      const value = args[++i];
      if (value === "all") {
        depth = Number.POSITIVE_INFINITY;
      } else if (/^[1-9]\d*$/u.test(value)) {
        depth = Number(value);
      } else {
        console.error(`Invalid --depth: ${value}`);
        return 2;
      }
    } else {
      console.error(
        "Usage: node scripts/generate-docs-index.ts [--root DIRECTORY] [--depth N|all] [--check]",
      );
      return 2;
    }
  }
  try {
    const status = syncIndex(root, check, depth);
    console.log(
      status === "current"
        ? "INDEX.tsv is up to date"
        : `Updated ${join(root, "INDEX.tsv")}`,
    );
    return 0;
  } catch (error) {
    console.error(
      `Index generation failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return 1;
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  process.exitCode = main();
}
