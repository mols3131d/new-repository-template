---
description: "Read when changing mise tool version requests, shared tasks or installation behavior."
---

# mise

[mise](https://mise.jdx.dev/) owns the shared tool version requests and project tasks. Executable settings are in [`mise.toml`](../../mise.toml).

After reviewing the file and authorizing changes to mise-managed installations and caches, run `mise install` to prepare tools. `agents-*` tasks delegate to the zero-dependency [agent asset manager](../../scripts/manage-agent-assets.ts) so `rulesync gitignore` target/feature derivation and workflow orchestration stay consistent without `npm ci`. Use `mise run check` for shared, read-only checks or `mise run format` for an explicit repository-wide write. Prefer scoped formatter commands for ordinary small changes.

## Version management

mise itself is installed outside this repository's tool list, so it cannot pin its own executable. Review stable mise updates and its release notes before upgrading.

The [version policy](README.md#version-management) uses major prefixes rather than npm semver ranges. `mise upgrade` can resolve new releases inside the selected major; projects needing reproducible installs should validate and commit `mise.lock`.

External Skill revisions are tracked separately in [Rulesync's lockfile](rulesync.md).
