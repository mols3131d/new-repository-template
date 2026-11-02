# Scripts

This directory is the home for **project-owned executable helpers** when a repeated task needs more logic than a native CLI or a short task in [mise.toml](../mise.toml).

The template intentionally contains **no custom executable script yet**. Existing agent setup, formatting, checks, and tool installation are delegated to their native commands through mise; see [Tools](../docs/tools/README.md). Do not add wrappers for these operations merely to populate this directory.

When a derived project needs custom automation, put the executable source here, choose the language/runtime already supported by that project, and expose frequently used commands through mise when useful. Keep the script's inputs, effects, exit status and required dependencies clear; verify it with the real environment. Separate read-only checks from operations that install, update, overwrite, publish or alter shared state.

Application code belongs with the application, configuration with its native owner, and generated vendor assets with the tool that produces them—not in `scripts/`.
