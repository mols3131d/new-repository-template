---
description: "Read when installing, updating, or retiring Rulesync-managed agent assets."
---

# Rulesync

[`rulesync.jsonc`](../../rulesync.jsonc) owns the selected upstream assets and target features. [`mise.toml`](../../mise.toml) exposes the setup and maintenance commands through [`manage-agent-assets.ts`](../../scripts/manage-agent-assets.ts). For supported target features, consult the [Rulesync support matrix](https://rulesync.dyoshikawa.com/reference/supported-tools.html), not a duplicated list here.

## Asset ownership

- External `sources` install **Skills and Rules**, not Commands or Subagents. Project-owned assets belong in `.rulesync/{skills,rules,commands,subagents}/` (outside `.curated/`). Enabling a feature does not install assets or prove runtime loading.
- Root [`AGENTS.md`](../../AGENTS.md) is project-owned. Rulesync rules are disabled for Codex CLI and Antigravity to avoid replacing it; Claude Code excludes root rule generation. Review ownership before changing these selections.
- Edit sources and target selections, **not generated vendor files**. See [asset lifecycle](../development/agents/assets.md).

## Setup and maintenance

`mise run agents-setup` resolves sources, creates `rulesync.lock`, and generates projections and ignore entries. Review the resulting lock and changes before committing. If GitHub rate limits interrupt installation, set `GITHUB_TOKEN` or `GH_TOKEN` and rerun setup; the lock may be partial.

`agents-restore` reproduces the lock (`--frozen`, fails on missing or incomplete entries); `agents-refresh` deliberately updates upstream revisions. `agents-check` validates configuration; `agents-preview` previews generation after installation. Run these through `mise run`; see [everyday commands](../../README.md#everyday-commands). `rulesync.local.jsonc` is a supported, Git-ignored local override.

## Generated files and retirement

`"delete": true` removes stale files **inside active generated output locations**; removing a target from the manifest alone does **not** retire its old outputs. Preview retirement before applying it:

```sh
mise run agents-retire -- claudecode --features skills
mise run agents-retire -- claudecode --features skills --apply
```

Use the **previously generated features** when retiring a target. Inspect the preview for manually modified files; `--apply` deletes those outputs.

Targets sharing `.agents/skills/` use `gitignoreDestination: "gitexclude"` so Antigravity can discover assets ignored by Git. This writes to clone-local `.git/info/exclude`, not the shared `.gitignore`; each clone must run setup or restore to receive it. A shared `.gitignore` rule still takes precedence for runtime discovery.

A passing configuration check or generation preview does not verify agent behavior. Use [harness verification](../development/agents/harness.md) for a representative runtime check.
