# mise

[mise](https://mise.jdx.dev/) owns the shared tool version requests and project tasks. The executable source is [mise.toml](../../mise.toml), not this document. A project created from the template may add its application toolchain separately.

After reviewing the file and authorizing changes to mise-managed installations and caches, run `mise install` to prepare tools. Use `mise run check` for shared, read-only checks or `mise run format` for an explicit repository-wide write. Prefer scoped formatter commands for ordinary small changes.

## Version management

mise itself is installed outside this repository's tool list, so it cannot pin its own executable. Review stable mise updates and its release notes before upgrading.

The [tool matrix](README.md#version-management) distinguishes strict (minor or exact) and loose (major) version requests. These are **mise prefixes**, not npm semver ranges; `mise upgrade` can resolve newer releases within an allowed prefix. Since the starter ships no `mise.lock`, prefix requests do not guarantee identical resolved versions across machines. When a derived project needs reproducibility, validate and commit a mise lockfile with its chosen tool versions. Follow [Initial Tool Setup](initial-setup.md) before changes that install or rewrite files.

Rulesync's external Skill revisions belong to [Rulesync](rulesync.md) and its own lockfile, separately from CLI version selection.
