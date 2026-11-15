---
description: "Follow when installing and validating shared CLI tools and Agent Skills for a new repository or machine."
---

# Initial Tool Setup

Use this for shared development tools and Agent Skills, not an application build or test environment.

## Before installing

- Install [mise](https://mise.jdx.dev/) if needed. Inspect [`mise.toml`](../../mise.toml) and [`rulesync.jsonc`](../../rulesync.jsonc) for tasks, tools, external sources and targets.
- Authorize installation, downloads and generated repository changes. Inspect mise configuration before approving trust.
- No `rulesync.lock` ships with the template. Review and commit the lockfile produced by the first installation before relying on reproducible Skill revisions.
- Review the [version policy](README.md#version-management) if reproducible tool installs matter.

## First setup

From the repository root:

```sh
mise install
mise run setup
```

`mise install` provisions CLI tools. `setup` installs and projects Skills, updates generated ignore entries and configures the clone-local [commit template](git/README.md). The commands may change tracked files; Git's local configuration is not committed.

Review before committing:

```sh
git status --short
mise run agents-check
mise run check
```

Inspect `rulesync.lock`, [`.gitignore`](../../.gitignore) and generated projections. `agents-check` previews generation; `check` validates formatting, lint and hooks without writing.

## Subsequent use

Reinstall a locked revision with `rulesync install --frozen` and `rulesync generate`. Use `mise run agents-refresh` only for intentional updates and review their diff. `mise run format` writes files; [Lefthook](lefthook.md) installation remains opt-in.

See [mise](mise.md) for tasks and [Rulesync](rulesync.md) for dependency maintenance.
