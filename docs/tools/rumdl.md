# rumdl

[rumdl](https://github.com/rvben/rumdl) formats and checks Markdown. Its configuration is [`.rumdl.toml`](../../.rumdl.toml), while [mise.toml](../../mise.toml) chooses the executable version.

`mise run check` performs Markdown checks without intentionally rewriting project documents. `mise run format` runs the repository-wide formatter and **writes files**; for small changes prefer scoped native commands such as `rumdl check docs/` or `rumdl fmt docs/README.md`.

The configuration uses GFM and avoids forced prose line wrapping. When upgrading rumdl or changing rules, inspect the generated formatting diff rather than assuming a patch release has identical output.

## Version management — strict

Use a **major prefix** in [`mise.toml`](../../mise.toml), allowing minor and patch updates within that major. rumdl is currently on major **0**, where minor releases can carry breaking changes; treat these as strict-review upgrades. Check release notes, run the repository's Markdown checks, and inspect representative formatting diffs. A shared major version is not a compatibility guarantee.
