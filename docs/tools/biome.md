---
description: "Read when configuring Biome code formatting, lint checks, version policy or Markdown exclusion."
---

# Biome

[Biome](https://biomejs.dev/) handles formatting and lint for supported JSON, JSONC, JavaScript and TypeScript files. [biome.json](../../biome.json) owns the behavior and schema, and [mise.toml](../../mise.toml) owns the installed CLI request.

`mise run check` invokes `biome check .` without automatically applying fixes. `mise run format` invokes `biome format --write .`, so it is an explicit whole-repository write. Prefer native commands with file or directory arguments for targeted work.

Keep Biome's schema compatible with the installed CLI.

## Version management — strict

Follow the [major-prefix policy](README.md#version-management), reviewing lint and formatting diffs on upgrades. Update [`biome.json`](../../biome.json)'s version-specific `$schema` URL when the resolved CLI requires it.

Markdown and MDX are excluded from Biome so [rumdl](rumdl.md) remains their formatter.
