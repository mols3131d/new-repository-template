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
} from "../../scripts/manage-agent-assets.ts";

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

test("stripJsonc handles BOM, escaped quotes, comments, and trailing commas", () => {
  const raw = `\uFEFF{
    // Line comment
    "$schema": "https://example.com/schema.json", /* block
    comment */
    "escaped": "a\\"//not-comment",
    "url": "https://github.com/org/repo,}",
    "targets": ["claudecode", /* trailing */ ],
  }`;
  const parsed = JSON.parse(stripJsonc(raw)) as {
    $schema: string;
    escaped: string;
    url: string;
    targets: string[];
  };
  assert.equal(parsed.$schema, "https://example.com/schema.json");
  assert.equal(parsed.escaped, 'a"//not-comment');
  assert.equal(parsed.url, "https://github.com/org/repo,}");
  assert.deepEqual(parsed.targets, ["claudecode"]);
});

test("parseRulesyncSelection handles object/array overlays, missing config, and cmd-safe checks", (t) => {
  const empty = fixture(t);
  assert.throws(
    () => parseRulesyncSelection(empty.root),
    /configuration file not found/,
  );

  const { root, write } = fixture(t);
  write(
    "rulesync.jsonc",
    `{
      "targets": {
        "claudecode": ["skills"],
        "codexcli": {
          "skills": true,
          "rules": false,
          "ignoredArray": ["skills"],
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
      "targets": {
        "copilot": ["rules", "skills"]
      }
    }`,
  );
  assert.deepEqual(parseRulesyncSelection(root), {
    targets: ["copilot"],
    features: ["rules", "skills"],
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

  write(
    "rulesync.local.jsonc",
    `{
      "targets": {
        "claudecode": [123]
      }
    }`,
  );
  assert.throws(
    () => parseRulesyncSelection(root),
    /invalid feature identifier/,
  );
});

test("setup, restore, and refresh pass derived gitignore args and stop on step failures", (t) => {
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

  calls.length = 0;
  assert.equal(
    main(["setup", "--root", root], root, {
      runCommand: (_cmd, args) => {
        calls.push(args);
        return { status: args[0] === "generate" ? 1 : 0 };
      },
    }),
    1,
  );
  assert.deepEqual(calls, [["install"], ["generate"]]);
});

test("install failures tailor rate-limit and partial-lock hints by command and lock presence", (t) => {
  const { root, write } = fixture(t);
  write("rulesync.jsonc", `{"targets":["claudecode"],"features":["skills"]}`);

  const restoreNoLockErrors: string[] = [];
  assert.equal(
    main(["restore", "--root", root], root, {
      runCommand: () => ({ status: 1 }),
      env: {},
      stderr: (line) => restoreNoLockErrors.push(line),
    }),
    1,
  );
  assert.equal(restoreNoLockErrors.length, 0);

  const setupNoLockErrors: string[] = [];
  assert.equal(
    main(["setup", "--root", root], root, {
      runCommand: () => ({ status: 1 }),
      env: {},
      stderr: (line) => setupNoLockErrors.push(line),
    }),
    1,
  );
  assert.match(setupNoLockErrors.join("\n"), /GITHUB_TOKEN or GH_TOKEN/);
  assert.doesNotMatch(setupNoLockErrors.join("\n"), /partial install/);

  write("rulesync.lock", "{}");
  const setupWithLockErrors: string[] = [];
  assert.equal(
    main(["setup", "--root", root], root, {
      runCommand: () => ({ status: 1 }),
      env: {},
      stderr: (line) => setupWithLockErrors.push(line),
    }),
    1,
  );
  assert.match(setupWithLockErrors.join("\n"), /GITHUB_TOKEN or GH_TOKEN/);
  assert.match(setupWithLockErrors.join("\n"), /rerun 'mise run setup'/);

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

test("check, preview short-circuit, --help, and usage errors work cleanly", (t) => {
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
    ["generate", "--dry-run", "--json"],
  ]);

  calls.length = 0;
  assert.equal(
    main(["preview", "--root", root], root, {
      runCommand: (_cmd, args) => {
        calls.push(args);
        return { status: 1 };
      },
    }),
    1,
  );
  assert.deepEqual(calls, [["doctor", "--strict"]]);

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

test("retire previews exact targets and features without installs or ignore writes", (t) => {
  const { root } = fixture(t);
  const calls: string[][] = [];
  const runner: CommandRunner = (_cmd, args) => {
    calls.push(args);
    return { status: 0 };
  };

  assert.equal(
    main(
      [
        "retire",
        "claudecode,codexcli,claudecode",
        "--features",
        "skills",
        "--root",
        root,
      ],
      root,
      { runCommand: runner },
    ),
    0,
  );
  assert.deepEqual(calls, [
    [
      "generate",
      "--retire-targets",
      "claudecode,codexcli",
      "--features",
      "skills",
      "--dry-run",
      "--json",
    ],
  ]);
});

test("retire applies only with --apply, then refreshes ignores", (t) => {
  const { root, write } = fixture(t);
  write("rulesync.jsonc", '{"targets":{"antigravity-ide":["skills"]}}');
  const calls: string[][] = [];
  const runner: CommandRunner = (_cmd, args) => {
    calls.push(args);
    return { status: 0 };
  };

  const argv = [
    "retire",
    "claudecode",
    "--features",
    "skills",
    "--apply",
    "--root",
    root,
  ];
  assert.equal(main(argv, root, { runCommand: runner }), 0);
  assert.deepEqual(calls, [
    ["generate", "--retire-targets", "claudecode", "--features", "skills"],
    ["gitignore", "--targets", "antigravity-ide", "--features", "skills"],
  ]);

  calls.length = 0;
  assert.equal(
    main(argv, root, {
      runCommand: (_cmd, args) => {
        calls.push(args);
        return { status: 1 };
      },
    }),
    1,
  );
  assert.deepEqual(calls, [
    ["generate", "--retire-targets", "claudecode", "--features", "skills"],
  ]);
});

test("retire rejects unsafe, incomplete, or ambiguous arguments without running commands", (t) => {
  const { root, write } = fixture(t);
  const calls: string[][] = [];
  const runner: CommandRunner = (_cmd, args) => {
    calls.push(args);
    return { status: 0 };
  };

  for (const args of [
    ["retire"],
    ["retire", "claudecode"],
    ["retire", "*", "--features", "skills"],
    ["retire", "claudecode", "--features", "*"],
    ["retire", "claudecode,", "--features", "skills"],
    ["retire", "claudecode", "--features", "skills,"],
    ["retire", "claudecode", "--features", "skills", "--apply", "--apply"],
    ["check", "--apply"],
  ]) {
    assert.equal(main(args, root, { runCommand: runner, stderr: () => {} }), 2);
  }
  assert.deepEqual(calls, []);

  write("rulesync.jsonc", '{"targets":{}}');
  assert.equal(
    main(
      [
        "retire",
        "claudecode",
        "--features",
        "skills",
        "--apply",
        "--root",
        root,
      ],
      root,
      { runCommand: runner, stderr: () => {} },
    ),
    1,
  );
  assert.deepEqual(calls, []);
});
