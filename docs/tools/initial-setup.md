# Initial Tool Setup

Use this after creating a repository from the template or preparing a new development machine. It sets up shared development tools and Agent Skills, **not** an application build or test environment.

## Before installing

- Install [mise](https://mise.jdx.dev/) separately if needed. Review [`mise.toml`](../../mise.toml) and [`rulesync.jsonc`](../../rulesync.jsonc) for executable tasks, requested tools, external Skill sources, and targets.
- Confirm that tool installation, external downloads and generated repository changes are authorized. If mise requests trust, inspect the configuration before approving it.
- The template has no pre-resolved `rulesync.lock`. The first Skill installation resolves upstream revisions; do not treat the initial selection as reproducible until its resulting lockfile is reviewed and committed.
- Shared CLI version requests use major prefixes, with strict or loose **review requirements** described in the [tool matrix](README.md#version-management). Without a `mise.lock`, resolved versions can differ across installations; inspect actual installed versions and check results.

## First setup

Run from the repository root after the checks above:

```sh
mise install
mise run agents-setup
```

`mise install` provisions declared CLI tools in mise-managed locations. `agents-setup` installs external Skills, generates target projections, and updates generated ignore entries. These commands can change local state and repository files.

Review the results before committing:

```sh
git status --short
mise run agents-check
mise run check
```

Inspect `rulesync.lock`, [`.gitignore`](../../.gitignore) and any generated files; stage and commit only intended changes. `agents-check` checks Rulesync configuration and generation preview. `check` runs shared read-only formatting, lint and hook-configuration checks. Neither proves application tests pass or that an agent runtime loaded and followed a Skill.

## Subsequent use

For an established lockfile, reinstall with `rulesync install --frozen` and `rulesync generate`. Use `mise run agents-refresh` only for an intentional upstream update and review its diff. `mise run format` rewrites files; [Lefthook](lefthook.md) installation is separate and opt-in.

See [mise](mise.md) for shared tasks and [Rulesync](rulesync.md) for dependency ownership and runtime-verification limits. Derived projects should add their own application setup and tests when needed.
