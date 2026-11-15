---
description: "Read when running Markdown lint and formatting or reviewing rumdl version changes."
---

# rumdl

[rumdl](https://github.com/rvben/rumdl) formats and checks Markdown. Its configuration is [`.rumdl.toml`](../../.rumdl.toml), while [mise.toml](../../mise.toml) chooses the executable version.

`mise run check` performs Markdown checks without intentionally rewriting project documents. `mise run format` runs the repository-wide formatter and **writes files**; for small changes prefer scoped native commands such as `rumdl check docs/` or `rumdl fmt docs/README.md`.

The configuration uses GFM and avoids forced prose line wrapping. When upgrading rumdl or changing rules, inspect the generated formatting diff rather than assuming a patch release has identical output.

## Version management — strict

Keep the [major-prefix policy](README.md#version-management). Because rumdl uses major `0`, minor releases can be breaking: review release notes, run Markdown checks and inspect formatting diffs.
