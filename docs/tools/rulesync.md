---
description: "Read when installing, regenerating or updating external Skills and runtime projections."
---

# Rulesync

[Rulesync](https://rulesync.dyoshikawa.com/) provides reusable Agent Skill dependencies and projections for selected agent runtimes. [rulesync.jsonc](../../rulesync.jsonc) is the **canonical selection and target configuration**; the Skills themselves remain upstream-owned. The template does not keep a second inventory of selected Skill names in documentation. [mise](mise.md) invokes [scripts/manage-agent-assets.ts](../../scripts/manage-agent-assets.ts) to derive `--targets` and `--features` for `rulesync gitignore` from `rulesync.jsonc` (and optional `rulesync.local.jsonc`) and share concise failure hints across `agents-*` tasks.

## First setup

This starter does not ship an initial `rulesync.lock`: the first authorized `mise run agents-setup` resolves the declared sources and writes the lock, curated files, runtime projections and managed ignore entries. Because `.agents/skills/` uses `gitexclude` (`.git/info/exclude`), `rulesync gitignore` requires running from a Git repository root (initialize Git first if starting from an archive). If unauthenticated GitHub API rate limits interrupt `rulesync install`, it can leave a partial `rulesync.lock`; provide `GITHUB_TOKEN` or `GH_TOKEN` (for example from an authorized `gh auth token` session) and rerun `mise run agents-setup` or `mise run setup`. Review the resolved refs, source selections, lock and `.gitignore` diff before committing them, and verify clone-local `.git/info/exclude` entries. Never hand-author a guessed lock.

On later runs, use `mise run agents-restore` to install with `--frozen`, regenerate projections and maintain ignore entries. A missing or incomplete lock must **fail visibly** instead of silently resolving new revisions. Plain `rulesync install` also reuses valid lock entries, but can resolve entries added or changed in the manifest; reserve `mise run agents-refresh` (`--update` plus projection and ignore synchronization) for an explicit upstream revision update. Because [`rulesync.jsonc`](../../rulesync.jsonc) enables `"delete": true`, `rulesync generate` removes stale files and directories in generated output folders (`.agents/skills/`, `.claude/skills/`, `.github/skills/`) that are no longer produced from `.rulesync/`, while `agents-preview` (`--dry-run`) reports planned deletions without modifying files. Author canonical local Skills under `.rulesync/skills/` (outside `.curated/`) rather than directly inside generated output folders, or override `"delete": false` in `rulesync.jsonc` / `rulesync.local.jsonc` if a derived project requires manual files there. Inspect resulting lock and generated diffs before committing.

`mise run agents-check` runs `rulesync doctor --strict` and works before or after `setup`. `mise run agents-preview` runs `agents-check` followed by `rulesync generate --dry-run` (requiring `.rulesync/` from `setup` or `restore`). Neither check substitutes for an end-to-end runtime evaluation; verify a representative target through [harness verification](../development/agents/harness.md).

Because Google Antigravity does not load rules, workflows or skills when they are listed in `.gitignore`, [`rulesync.jsonc`](../../rulesync.jsonc) sets `"gitignoreDestination": "gitexclude"` on the shared `.agents/skills/` targets (`codexcli`, `antigravity-ide`, `antigravity-cli`, `agentsskills`). Running `rulesync gitignore` writes `**/.agents/skills/` to clone-local `.git/info/exclude` while keeping shared `.gitignore` entries for `.rulesync/skills/.curated/`, `rulesync.local.jsonc`, `**/.claude/skills/` and `**/.github/skills/`. Because `rulesync gitignore` takes one combined `--features` list, targets with mixed features apply their combined feature set to managed ignore entries.

## Retire a target or feature

Removing a tool or feature from `rulesync.jsonc` does **not** remove that target's previously generated outputs, even with `"delete": true`. After removing the selection, explicitly retire its old outputs using the features it previously generated:

```sh
mise run agents-retire -- claudecode --features skills
mise run agents-retire -- claudecode --features skills --apply
```

The first command is a read-only `rulesync generate --retire-targets ... --dry-run` preview. `--apply` delegates deletion to Rulesync, then resynchronizes managed `.gitignore` / `.git/info/exclude` entries for active targets; it does not install or update upstream dependencies. Pass comma-separated target and feature names when retiring several. The wrapper rejects wildcards, requires explicit feature names and never infers historical targets. Rulesync rejects retirement of features still enabled for a selected target. Managed outputs may include hand-edited files: inspect the preview and preserve any needed work under its canonical source before applying. Check `git status --short` and `git diff` afterward. For [native retirement semantics](https://rulesync.dyoshikawa.com/reference/cli-commands#generate-command), see the upstream CLI reference.

Do not edit generated projections; maintain asset selection and ownership through the [asset lifecycle](../development/agents/assets.md).

## Version management — strict

Track the CLI's major line as defined by the [tool policy](README.md#version-management). Review generator and schema changes within that line: run `mise run agents-check` (and `mise run agents-preview` after setup), inspect projection and ignore-file diffs, and verify relevant runtimes.

Upgrading the CLI does not update upstream Skill revisions; those are resolved separately in `rulesync.lock`.
