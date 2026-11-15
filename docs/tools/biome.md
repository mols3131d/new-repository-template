# Biome

[Biome](https://biomejs.dev/) handles formatting and lint for supported JSON, JSONC, JavaScript and TypeScript files. [biome.json](../../biome.json) owns the behavior and schema, and [mise.toml](../../mise.toml) owns the installed CLI request.

`mise run check` invokes `biome check .` without automatically applying fixes. `mise run format` invokes `biome format --write .`, so it is an explicit whole-repository write. Prefer native commands with file or directory arguments for targeted work.

Keep the Biome schema and installed CLI compatible when updating. This formatter does not establish a JavaScript/TypeScript application toolchain for future projects.

## Version management — strict

Use a **minor prefix** in [`mise.toml`](../../mise.toml). Keep the schema declaration in [`biome.json`](../../biome.json) compatible with the selected CLI; review release notes, configuration validation, lint changes and formatting diffs before moving to another minor line. Patch updates also require normal checks.

Biome supports Markdown, but this starter deliberately excludes `.md` and `.mdx` from its configured file set so [rumdl](rumdl.md) alone owns Markdown formatting. Revisit that boundary explicitly if a derived project changes formatters; `mise run format` is a repository-wide write.
