import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test, { type TestContext } from "node:test";
import {
  type CommandRunner,
  main,
  parseRulesyncSelection,
  stripJsonc,
} from "../scripts/manage-agent-assets.ts";

function fixture(t: TestContext) {
  const root = mkdtempSync(join(tmpdir(), "agents-cli-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const write = (relPath: string, content: string): string => {
    const target = join(root, relPath);
    writeFileSync(target, content, "utf8");
    return target;
  };
  return { root, write };
}

test("stripJsonc preserves strings while stripping comments and trailing commas", () => {
  const raw = `{
    // Line comment
    "$schema": "https://example.com/schema.json", /* block
    comment */
    "url": "https://github.com/org/repo,}",
    "targets": ["claudecode", /* trailing */ ],
  }`;
  const parsed = JSON.parse(stripJsonc(raw)) as {
    $schema: string;
    url: string;
    targets: string[];
  };
  assert.equal(parsed.$schema, "https://example.com/schema.json");
  assert.equal(parsed.url, "https://github.com/org/repo,}");
  assert.deepEqual(parsed.targets, ["claudecode"]);
});

test("parseRulesyncSelection handles object targets, array local overlay, and cmd-safe validation", (t) => {
  const { root, write } = fixture(t);
  write(
    "rulesync.jsonc",
    `{
      "targets": {
        "claudecode": ["skills"],
        "codexcli": {
          "skills": true,
          "rules": false,
          "gitignoreDestination": "gitexclude"
        }
      }
    }`,
  );
  assert.deepEqual(parseRulesyncSelection(root), {
    targets: ["claudecode", "codexcli"],
    features: ["skills"],
  });

  write(
    "rulesync.local.jsonc",
    `{
      "targets": ["claudecode", "copilot"]
    }`,
  );
  assert.deepEqual(parseRulesyncSelection(root), {
    targets: ["claudecode", "copilot"],
    features: ["rules"],
  });

  write(
    "rulesync.local.jsonc",
    `{
      "targets": ["-flag"]
    }`,
  );
  assert.throws(
    () => parseRulesyncSelection(root),
    /invalid target identifier/,
  );
});

test("setup, restore, and refresh pass derived gitignore args and surface install hints", (t) => {
  const { root, write } = fixture(t);
  write(
    "rulesync.jsonc",
    `{
      "targets": {
        "claudecode": ["skills"],
        "antigravity-ide": { "skills": true, "gitignoreDestination": "gitexclude" }
      }
    }`,
  );

  const calls: string[][] = [];
  const runner: CommandRunner = (_cmd, args) => {
    calls.push(args);
    return { status: 0 };
  };

  for (const [cmd, expectedInstall] of [
    ["setup", ["install"]],
    ["restore", ["install", "--frozen"]],
    ["refresh", ["install", "--update"]],
  ] as const) {
    calls.length = 0;
    assert.equal(main([cmd, "--root", root], root, { runCommand: runner }), 0);
    assert.deepEqual(calls, [
      expectedInstall,
      ["generate"],
      [
        "gitignore",
        "--targets",
        "claudecode,antigravity-ide",
        "--features",
        "skills",
      ],
    ]);
  }

  write("rulesync.lock", "{}");
  const setupErrors: string[] = [];
  assert.equal(
    main(["setup", "--root", root], root, {
      runCommand: () => ({ status: 1 }),
      env: {},
      stderr: (line) => setupErrors.push(line),
    }),
    1,
  );
  assert.match(setupErrors.join("\n"), /GITHUB_TOKEN or GH_TOKEN/);
  assert.match(setupErrors.join("\n"), /rerun 'mise run setup'/);

  const refreshErrors: string[] = [];
  assert.equal(
    main(["refresh", "--root", root], root, {
      runCommand: () => ({ status: 1 }),
      env: { GITHUB_TOKEN: "ok" },
      stderr: (line) => refreshErrors.push(line),
    }),
    1,
  );
  assert.match(refreshErrors.join("\n"), /rerun 'mise run agents-refresh'/);
  assert.doesNotMatch(refreshErrors.join("\n"), /GITHUB_TOKEN/);
});

test("check, preview, --help, and usage errors work cleanly", (t) => {
  const { root } = fixture(t);
  const calls: string[][] = [];
  const runner: CommandRunner = (_cmd, args) => {
    calls.push(args);
    return { status: 0 };
  };

  assert.equal(
    main(["check", "--root", root], root, { runCommand: runner }),
    0,
  );
  assert.deepEqual(calls, [["doctor", "--strict"]]);

  calls.length = 0;
  assert.equal(
    main(["preview", "--root", root], root, { runCommand: runner }),
    0,
  );
  assert.deepEqual(calls, [
    ["doctor", "--strict"],
    ["generate", "--dry-run"],
  ]);

  assert.equal(main(["unknown"], root, { stderr: () => {} }), 2);

  const help: string[] = [];
  const shortHelp: string[] = [];
  assert.equal(
    main(["--help"], root, { stdout: (line) => help.push(line) }),
    0,
  );
  assert.equal(
    main(["-h"], root, { stdout: (line) => shortHelp.push(line) }),
    0,
  );
  assert.match(help.join("\n"), /Commands:/);
  assert.equal(shortHelp.join("\n"), help.join("\n"));
});
