# Development

Use this area for how contributors understand, change and verify a project. The template does not preselect an application language, build system or test runner.

## Current setup

Shared repository utilities, formatting, Git hooks and the Rulesync asset setup are documented under [Tools](../tools/README.md). Their executable settings are in [mise.toml](../../mise.toml) and [rulesync.jsonc](../../rulesync.jsonc). The root [AGENTS.md](../../AGENTS.md) owns the agent working baseline; it is not duplicated here.

Project-owned executable automation belongs in [scripts/](../../scripts/README.md) only when an existing native CLI or `mise` task is insufficient. The executable task declarations remain in [mise.toml](../../mise.toml).

## When the project grows

Document the actual source layout, local application setup, test/build commands, contribution workflow and CI requirements here when they exist. Describe decisions at the level contributors need, link to executable configuration and avoid speculative instructions.

Product usage instructions belong in [Guides](../guides/README.md). Substantive system design rationale belongs in [Architecture](../architecture/README.md). Tool version and configuration guidance belongs in [Tools](../tools/README.md).
