# mise

[mise](https://mise.jdx.dev/) owns the shared tool version requests and project tasks. The executable source is [mise.toml](../../mise.toml), not this document. A project created from the template may add its application toolchain separately.

After reviewing the file and authorizing changes to mise-managed installations and caches, run `mise install` to prepare tools. Use `mise run check` for shared, read-only checks or `mise run format` for an explicit repository-wide write. Prefer scoped formatter commands for ordinary small changes.

Exact CLI pins in `mise.toml` are deliberate reproducibility choices; tool upgrades require reviewing upstream changes and the resulting output. A lockfile is not included or claimed verified by this template. The Rulesync external Skill revision lifecycle is owned by [Rulesync](rulesync.md), separately from CLI versions.
