---
description: "Read when installing, regenerating or updating external Skills and runtime projections."
---

# Rulesync

[Rulesync](https://rulesync.dyoshikawa.com/) installs selected upstream Skills and generates supported agent-runtime projections (Rules, Commands, Subagents, and Skills). [rulesync.jsonc](../../rulesync.jsonc) is the **canonical source selection and target configuration**; imported Skills remain upstream-owned. The template does not keep a second inventory of selected Skill names in documentation. [mise](mise.md) invokes [scripts/manage-agent-assets.ts](../../scripts/manage-agent-assets.ts) to derive `--targets` and `--features` for `rulesync gitignore` from `rulesync.jsonc` (and optional `rulesync.local.jsonc`) and share concise failure hints across `agents-*` tasks.

## Supported asset types and ownership

The manifest configures **Claude Code, Codex CLI, GitHub Copilot, Copilot CLI, Antigravity IDE/CLI, and the generic Agent Skills target**. Each target enables only the features that Rulesync supports and that this template can safely generate; the target matrix is maintained in the [official Rulesync support table](https://rulesync.dyoshikawa.com/reference/supported-tools.html).

| Asset | Canonical input | Availability |
| --- | --- | --- |
| Skills | The selected upstream `sources`, or project-owned `.rulesync/skills/` | Installed by `rulesync install`, then projected for compatible targets |
| Rules | Project-owned `.rulesync/rules/*.md`, or a `sources[].rules` selection with `rulesPath` | Enabled for Claude Code (scoped only) and Copilot |
| Subagents | Project-owned `.rulesync/subagents/*.md` | Enabled only for the targets selected in the manifest |
| Commands | Project-owned `.rulesync/commands/*.md` | Enabled only for the targets selected in the manifest |

**Feature enablement is not asset installation.** Declarative `sources` currently installs **Rules and Skills only**; it does not fetch Commands or Subagents from external repositories. To use external Subagents or Commands, arrange an explicitly reviewed, revision-aware upstream acquisition into a Rulesync input directory, or maintain a genuinely project-owned definition. Do not assume that enabling `subagents` installs the upstream `mols-agent-assets` Subagents. Some upstream Skills explicitly restrict their `targets`; manifest selection does not override those restrictions. Confirm the installed assets and runtime reachability instead of relying on the target list.

The tracked root [`AGENTS.md`](../../AGENTS.md) is **repository-owned**, not a Rulesync projection. Rule generation is deliberately omitted for Codex CLI and Antigravity, whose root-rule projections could collide with `AGENTS.md`. Claude Code uses `rules.includeRoot: false` to avoid a generated root `CLAUDE.md`; scoped rules remain possible. Do not enable additional root-rule targets without reviewing ownership, precedence and `delete: true` effects. Commands are also intentionally disabled where project-mode support is absent or legacy/deprecated; prefer a Skill instead when that expresses the desired behavior.

## First setup

This starter does not ship an initial `rulesync.lock`: the first authorized `mise run agents-setup` resolves the declared sources and writes the lock, curated files, enabled runtime projections and managed ignore entries. Because `.agents/skills/` uses `gitexclude` (`.git/info/exclude`), `rulesync gitignore` requires running from a Git repository root (initialize Git first if starting from an archive). If unauthenticated GitHub API rate limits interrupt `rulesync install`, it can leave a partial `rulesync.lock`; provide `GITHUB_TOKEN` or `GH_TOKEN` (for example from an authorized `gh auth token` session) and rerun `mise run agents-setup` or `mise run setup`. Review the resolved refs, source selections, lock and `.gitignore` diff before committing them, and verify clone-local `.git/info/exclude` entries. Never hand-author a guessed lock.

On later runs, use `mise run agents-restore` to install with `--frozen`, regenerate projections and maintain ignore entries. A missing or incomplete lock must **fail visibly** instead of silently resolving new revisions. Plain `rulesync install` also reuses valid lock entries, but can resolve entries added or changed in the manifest; reserve `mise run agents-refresh` (`--update` plus projection and ignore synchronization) for an explicit upstream revision update. Because [`rulesync.jsonc`](../../rulesync.jsonc) enables `"delete": true`, `rulesync generate` removes stale files and directories in generated output folders (including `.agents/skills/`, `.claude/skills/` and `.github/skills/`) that are no longer produced from `.rulesync/`, while `agents-preview` (`--dry-run`) reports planned deletions without modifying files. Author project-owned assets under their `.rulesync/<type>/` input directory (outside `.curated/`) rather than directly inside generated output folders, or override `"delete": false` in `rulesync.jsonc` / `rulesync.local.jsonc` if a derived project requires manual files there. Inspect resulting lock and generated diffs before committing.

`mise run agents-check` runs `rulesync doctor --strict` and works before or after `setup`. `mise run agents-preview` runs `agents-check` followed by `rulesync generate --dry-run` (requiring `.rulesync/` from `setup` or `restore`). Neither check substitutes for an end-to-end runtime evaluation; verify a representative target through [harness verification](../development/agents/harness.md).

`gitignoreDestination: "gitexclude"` sends Rulesync-managed ignore entries to the clone-local Git exclude file (`.git/info/exclude`) rather than the version-controlled `.gitignore`. This is not a different generation destination or a mechanism for automatically tracking assets. It must be regenerated in **each clone**, does not untrack already committed files, and cannot override a conflicting shared `.gitignore` rule. Inspect both ignore destinations when adding a feature or target; the manager derives one union of enabled features for `rulesync gitignore`, so generated ignore entries can cover more than one per-target feature combination.

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
