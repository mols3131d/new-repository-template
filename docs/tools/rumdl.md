# rumdl

[rumdl](https://github.com/rvben/rumdl) formats and checks Markdown. Its configuration is [`.rumdl.toml`](../../.rumdl.toml), while [mise.toml](../../mise.toml) chooses the executable version.

`mise run check` performs Markdown checks without intentionally rewriting project documents. `mise run format` runs the repository-wide formatter and **writes files**; for small changes prefer scoped native commands such as `rumdl check docs/` or `rumdl fmt docs/README.md`.

The configuration uses GFM and avoids forced prose line wrapping. When upgrading rumdl or changing rules, inspect the generated formatting diff rather than assuming a patch release has identical output.

## Version management — strict

Use a **minor prefix** in [`mise.toml`](../../mise.toml) so ordinary patch updates remain available without automatically crossing a new rule/formatter minor line. Before changing that line, review release notes, run the repository's Markdown checks, and inspect formatting changes on representative documents. Underlying lint behavior can still change in patch releases; a prefix is not a compatibility guarantee.
