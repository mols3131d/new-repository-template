# Documentation

This template separates project documentation by its reader and responsibility. Only areas with a real purpose are created; add narrower directories when a project has enough material to justify them.

| Area | Responsibility |
| --- | --- |
| [Development](development/README.md) | Contributing, local development, verification and development practices |
| [Tools](tools/README.md) | Tool selection, setup, configuration, commands and update boundaries |
| [Guides](guides/README.md) | Task-based instructions for people using the resulting project |
| [Architecture](architecture/README.md) | System structure, dependencies, design rationale and technical decisions |

## Extending the structure

- Place each document with the nearest owner of its subject, not wherever there is space. Tool-specific maintenance belongs in `tools/`; contributor workflows belong in `development/`.
- Avoid copying values from native source files. Tool versions and tasks live in [mise.toml](../mise.toml); external Skill selection lives in [rulesync.jsonc](../rulesync.jsonc). Link rather than restate maintained inventories.
- Create a nested topic directory or an entrypoint only when multiple related documents or a distinct ownership boundary make navigation worthwhile. Do not create placeholder taxonomies.
- Separate implemented facts from proposals and unverified assumptions. A new document is not proof the corresponding product behavior exists.

The repository [README](../README.md) provides first-use instructions and [AGENTS.md](../AGENTS.md) owns the agent working baseline. This index routes documentation but does not replace either.
