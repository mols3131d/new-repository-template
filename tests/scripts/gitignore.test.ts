import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const gitignore = readFileSync(new URL("../../.gitignore", import.meta.url), "utf8");

const ignored = [
  ".env",
  "sub/.env.production",
  ".env.development.local",
  "src/config.local.ts",
  "sub/feature.local.test.ts",
  "settings.local",
  "mise.local.toml",
  "rulesync.local.jsonc",
  "node_modules/pkg/index.js",
  "sub/.venv/bin/python",
  "venv/bin/python",
  "__pycache__/module.pyc",
  ".pytest_cache/v/cache",
  "sub/.mypy_cache/data",
  ".cache/tool/data",
  ".rumdl_cache/data",
  ".rulesync/skills/.curated/skill.md",
  ".rulesync/rules/.curated/rule.md",
  "coverage/lcov.info",
  "sub/coverage/index.html",
  "debug.log",
  "tsconfig.tsbuildinfo",
  "work.tmp",
  "backup.bak",
  "old.orig",
  ".DS_Store",
  "sub/Thumbs.db",
  "file.swp",
  "file.swo",
  "notes~",
];

const visible = [
  ".env.example",
  "sub/.env.sample",
  ".env.template",
  "sub/.env.dist",
  "src/config.ts",
  "src/config.locality.ts",
  "local.config.ts",
  "package-lock.json",
  "pnpm-lock.yaml",
  "dist/index.js",
  "build/index.js",
  ".vscode/settings.json",
  ".github/workflows/ci.yml",
  "docs/README.md",
];

test("repository ignores transient files without hiding shared configuration", (t) => {
  const repo = mkdtempSync(join(tmpdir(), "gitignore-test-"));
  t.after(() => rmSync(repo, { recursive: true, force: true }));
  writeFileSync(join(repo, ".gitignore"), gitignore);
  const init = spawnSync("git", ["init", "-q"], { cwd: repo, encoding: "utf8" });
  assert.equal(init.status, 0, init.stderr || init.error?.message || "git init failed");

  for (const [paths, expected] of [[ignored, 0], [visible, 1]] as const) {
    for (const path of paths) {
      const result = spawnSync(
        "git",
        [
          "-c",
          "core.excludesFile=/dev/null",
          "check-ignore",
          "-q",
          "--no-index",
          "--",
          path,
        ],
        { cwd: repo, encoding: "utf8" },
      );
      assert.equal(
        result.status,
        expected,
        `${path}: ${result.stderr || result.error?.message || "unexpected ignore result"}`,
      );
    }
  }
});
