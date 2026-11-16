import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
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

test("stripJsonc preserves URLs and strings while stripping comments and trailing commas", () => {
  const raw = `{
    // Line comment
    "$schema": "https://example.com/schema.json", /* block
    comment */
    "url": "https://github.com/org/repo,}",
    "targets": ["claudecode",],
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

test("parseRulesyncSelection extracts object-form targets and features without gitignoreDestination", (t) => {
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
        },
        "antigravity-ide": {
          "skills": true,
          "gitignoreDestination": "gitexclude"
        }
      }
    }`,
  );
  assert.deepEqual(parseRulesyncSelection(root), {
    targets: ["claudecode", "codexcli", "antigravity-ide"],
    features: ["skills"],
  });
});

test("parseRulesyncSelection supports array-form targets and optional local overlay", (t) => {
  const { root, write } = fixture(t);
  write(
    "rulesync.jsonc",
    `{
      "targets": ["claudecode", "copilot"],
      "features": ["skills"]
    }`,
  );
  write(
    "rulesync.local.jsonc",
    `{
      "gitignoreDestination": "gitexclude"
    }`,
  );
  assert.deepEqual(parseRulesyncSelection(root), {
    targets: ["claudecode", "copilot"],
    features: ["skills"],
  });
});

test("parseRulesyncSelection rejects invalid target identifiers", (t) => {
  const { root, write } = fixture(t);
  write(
    "rulesync.jsonc",
    `{
      "targets": {
        "bad;target": ["skills"]
      }
    }`,
  );
  assert.throws(
    () => parseRulesyncSelection(root),
    /invalid target identifier/,
  );
});

test("setup, restore, and refresh run the expected Rulesync sequence using config targets", (t) => {
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

  const calls: Array<{ command: string; args: string[]; cwd: string }> = [];
  const runner: CommandRunner = (command, args, cwd) => {
    calls.push({ command, args, cwd });
    return { status: 0 };
  };

  assert.equal(
    main(["setup", "--root", root], root, { runCommand: runner }),
    0,
  );
  assert.deepEqual(
    calls.map((c) => c.args),
    [
      ["install"],
      ["generate"],
      [
        "gitignore",
        "--targets",
        "claudecode,antigravity-ide",
        "--features",
        "skills",
      ],
    ],
  );

  calls.length = 0;
  write("rulesync.lock", "{}");
  assert.equal(
    main(["restore", "--root", root], root, { runCommand: runner }),
    0,
  );
  assert.deepEqual(
    calls.map((c) => c.args),
    [
      ["install", "--frozen"],
      ["generate"],
      [
        "gitignore",
        "--targets",
        "claudecode,antigravity-ide",
        "--features",
        "skills",
      ],
    ],
  );

  calls.length = 0;
  assert.equal(
    main(["refresh", "--root", root], root, { runCommand: runner }),
    0,
  );
  assert.deepEqual(
    calls.map((c) => c.args),
    [
      ["install", "--update"],
      ["generate"],
      [
        "gitignore",
        "--targets",
        "claudecode,antigravity-ide",
        "--features",
        "skills",
      ],
    ],
  );
});

test("restore fails visibly when rulesync.lock is absent", (t) => {
  const { root, write } = fixture(t);
  write("rulesync.jsonc", `{"targets":["claudecode"],"features":["skills"]}`);
  const errors: string[] = [];
  let invoked = false;
  const runner: CommandRunner = () => {
    invoked = true;
    return { status: 0 };
  };
  assert.equal(
    main(["restore", "--root", root], root, {
      runCommand: runner,
      stderr: (line) => errors.push(line),
    }),
    1,
  );
  assert.equal(invoked, false);
  assert.match(errors.join("\n"), /rulesync\.lock not found/);
});

test("setup failure without token prints rate-limit and partial-lock recovery guidance", (t) => {
  const { root, write } = fixture(t);
  write("rulesync.jsonc", `{"targets":["claudecode"],"features":["skills"]}`);
  write("rulesync.lock", "{}");
  const errors: string[] = [];
  const runner: CommandRunner = () => ({ status: 1 });

  assert.equal(
    main(["setup", "--root", root], root, {
      runCommand: runner,
      env: {},
      stderr: (line) => errors.push(line),
    }),
    1,
  );
  const output = errors.join("\n");
  assert.match(output, /GITHUB_TOKEN or GH_TOKEN/);
  assert.match(output, /partial install/);
});

test("preview checks doctor first and fails clearly before setup", (t) => {
  const { root } = fixture(t);
  const calls: string[][] = [];
  const errors: string[] = [];
  const runner: CommandRunner = (_cmd, args) => {
    calls.push(args);
    return { status: 0 };
  };

  assert.equal(
    main(["preview", "--root", root], root, {
      runCommand: runner,
      stderr: (line) => errors.push(line),
    }),
    1,
  );
  assert.deepEqual(calls, [["doctor", "--strict"]]);
  assert.match(errors.join("\n"), /\.rulesync does not exist yet/);

  calls.length = 0;
  mkdirSync(join(root, ".rulesync"));
  assert.equal(
    main(["preview", "--root", root], root, { runCommand: runner }),
    0,
  );
  assert.deepEqual(calls, [
    ["doctor", "--strict"],
    ["generate", "--dry-run"],
  ]);
});

test("check runs doctor --strict read-only and usage errors exit with code 2", (t) => {
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
  assert.equal(main(["unknown"], root, { stderr: () => {} }), 2);

  const helpLines: string[] = [];
  assert.equal(
    main(["--help"], root, { stdout: (line) => helpLines.push(line) }),
    0,
  );
  assert.match(helpLines.join("\n"), /Commands:/);
  assert.match(helpLines.join("\n"), /Read-only:/);

  const shortHelpLines: string[] = [];
  assert.equal(
    main(["-h"], root, { stdout: (line) => shortHelpLines.push(line) }),
    0,
  );
  assert.equal(shortHelpLines.join("\n"), helpLines.join("\n"));
});
