---
description: "Read when installing, updating, or retiring Rulesync-managed agent assets."
---

# Rulesync

[`rulesync.jsonc`](../../rulesync.jsonc) owns the selected upstream assets and target features. [`mise.toml`](mise.md) exposes the setup and maintenance commands through [`manage-agent-assets.ts`](../../scripts/manage-agent-assets.ts). For supported target features, consult the [Rulesync support matrix](https://rulesync.dyoshikawa.com/reference/supported-tools.html), not a duplicated list here.

## Asset ownership

- External `sources` install **Skills and Rules**, not Commands or Subagents. Project-owned assets belong in `.rulesync/{skills,rules,commands,subagents}/` (outside `.curated/`). Enabling a feature does not install assets or prove runtime loading.
- Root [`AGENTS.md`](../../AGENTS.md) is project-owned. Rulesync rules are disabled for Codex CLI and Antigravity to avoid replacing it; Claude Code excludes root rule generation. Review ownership before changing these selections.
- Edit sources and target selections, **not generated vendor files**. See [asset lifecycle](../development/agents/assets.md).

## Setup and maintenance

| Task | Command | Important behavior |
| --- | --- | --- |
| Validate config | `mise run agents-check` | Runs `rulesync doctor --strict` |
| First install | `mise run agents-setup` | Resolves sources and creates `rulesync.lock`, projections and ignore entries |
| Reproduce locked state | `mise run agents-restore` | Uses `--frozen`; fails if the lock is missing or incomplete |
| Update upstream | `mise run agents-refresh` | Deliberately refreshes source revisions |
| Preview generation | `mise run agents-preview` | Requires installed `.rulesync/`; does not write projections |

Review the resolved lock, generated files and ignore changes before committing. If GitHub rate limits interrupt the first install, authenticate with `GITHUB_TOKEN` or `GH_TOKEN` and rerun setup; the interrupted `rulesync.lock` may be partial. `rulesync.local.jsonc` is a supported, Git-ignored local override.

## Generated files and retirement

`"delete": true` removes stale files **inside active generated output locations**; removing a target from the manifest alone does **not** retire its old outputs. Preview retirement before applying it:

```sh
mise run agents-retire -- claudecode --features skills
mise run agents-retire -- claudecode --features skills --apply
```

Use the **previously generated features** when retiring a target. Inspect the preview for manually modified files; `--apply` deletes those outputs.

Targets sharing `.agents/skills/` use `gitignoreDestination: "gitexclude"` so Antigravity can discover assets ignored by Git. This writes to clone-local `.git/info/exclude`, not the shared `.gitignore`; each clone must run setup or restore to receive it. A shared `.gitignore` rule still takes precedence for runtime discovery.

A passing configuration check or generation preview does not verify agent behavior. Use [harness verification](../development/agents/harness.md) for a representative runtime check.
