---
description: "Find project-owned scripts, documentation indexing and guidance for adding custom automation."
---

# Scripts

This directory is the home for **project-owned executable helpers** when a repeated task needs more logic than a native CLI or a short task in [mise.toml](../mise.toml).

The [documentation index generator](generate-docs-index.ts) is the only included project-owned script. It creates and checks [docs/INDEX.tsv](../docs/INDEX.tsv) from YAML frontmatter, with configurable source directory and depth. [Frontmatter and index](../docs/documentation/frontmatter.md) documents usage; [tests](../tests/generate-docs-index.test.ts) exercise errors and drift. Existing setup, formatting, and tooling still use native commands through mise; avoid redundant wrappers.

When a derived project needs custom automation, put the executable source here, choose the language/runtime already supported by that project, and expose frequently used commands through mise when useful. Keep the script's inputs, effects, exit status and required dependencies clear; verify it with the real environment. Separate read-only checks from operations that install, update, overwrite, publish or alter shared state.

Agents editing this directory also follow its [scoped instructions](AGENTS.md); those instructions do not define a second owner of script behavior.

Application code belongs with the application, configuration with its native owner, and generated vendor assets with the tool that produces them—not in `scripts/`.
