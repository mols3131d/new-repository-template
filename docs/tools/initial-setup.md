---
description: "Follow when installing and validating shared CLI tools and Agent Skills for a new repository or machine."
---

# Initial Tool Setup

Use this for shared development tools and Agent Skills, not an application build or test environment.

## Before installing

- Install [mise](https://mise.jdx.dev/) if needed. Inspect [`mise.toml`](../../mise.toml) and [`rulesync.jsonc`](../../rulesync.jsonc) for tasks, tools, external sources and targets.
- Authorize installation, downloads and generated repository changes. Inspect mise configuration before approving trust.
- The template does not ship `rulesync.lock`; the first install resolves upstream refs. Inspect and commit the real generated lock before expecting repeatable Skill revisions.
- Review the [version policy](README.md#version-management) if reproducible tool installs matter.

## First setup

From the repository root:

```sh
mise install
mise run setup
```

`mise install` provisions CLI tools. `setup` installs and projects Skills, updates generated ignore entries and configures the clone-local [commit template](git/README.md). Run `setup` from a Git repository root (initialize Git first if starting from an extracted archive), because shared `.agents/skills/` targets write to clone-local `.git/info/exclude`. The commands may change tracked files; Git's local configuration is not committed. If `rulesync install` hits GitHub's unauthenticated API rate limit and leaves a partial `rulesync.lock`, provide `GITHUB_TOKEN` or `GH_TOKEN` and rerun `mise run setup` before proceeding (see [Rulesync](rulesync.md)).

Review before committing:

```sh
git status --short
mise run agents-preview
mise run check
```

Inspect `rulesync.lock`, [`.gitignore`](../../.gitignore), `.git/info/exclude` and generated projections. `agents-preview` runs `agents-check` and prints the Rulesync JSON write/delete plan without changing projections once `setup` (or `restore`) has created `.rulesync/`. Review proposed deletions (including directory contents) against hand-maintained files; a preview of currently installed sources does not predict changes from a later upstream refresh. `check` validates formatting, lint and hooks without writing.

## Subsequent use and recovery

Run `mise run agents-restore` for an accepted `rulesync.lock`. It uses `--frozen` and **fails** if the lock does not cover the current sources/selections; do not replace that failure with an implicit update. After repairing the manifest/lock mismatch through an explicitly reviewed change, run restore again. Use `mise run agents-refresh` only for intentional upstream updates and inspect its lock and projection diff. When removing a target or feature, explicitly preview and apply `mise run agents-retire -- <targets> --features <features> [--apply]`; routine setup/restore cannot infer previously configured targets.

For a second setup, check `git status --short` before and after; rerunning `mise run setup` may also rewrite the clone-local Git commit-template setting. Restore does not install Lefthook or alter that setting. Tool versions specified by major line in `mise.toml` can still drift; review [version policy](README.md#version-management) and use `mise.lock` if exact tool reproducibility matters. `mise run format` writes files; [Lefthook](lefthook.md) remains opt-in.

See [mise](mise.md) for tasks and [Rulesync](rulesync.md) for dependency maintenance.
