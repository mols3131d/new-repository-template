# Biome

[Biome](https://biomejs.dev/) handles formatting and lint for supported JSON, JSONC, JavaScript and TypeScript files. [biome.json](../../biome.json) owns the behavior and schema, and [mise.toml](../../mise.toml) owns the installed CLI request.

`mise run check` invokes `biome check .` without automatically applying fixes. `mise run format` invokes `biome format --write .`, so it is an explicit whole-repository write. Prefer native commands with file or directory arguments for targeted work.

Keep the Biome schema and installed CLI compatible when updating. This formatter does not establish a JavaScript/TypeScript application toolchain for future projects.
