# Development Reference

This template has no selected application language, framework, dependencies, test runner, or release workflow. Do not invent commands or claim checks exist before the derived repository implements them.

## Agent and tool initialization

- [Agent assets and selection](agent-assets.md) owns the initial Skill dependency set, Rulesync update flow, and template-specific limitations.
- Root [mise.toml](../../mise.toml) owns the initial **agent tooling only**. Its `agents-setup` task resolves remote Skills and generates their target projections; it does **not** establish an application development environment by itself.
- Root [AGENTS.md](../../AGENTS.md) owns the repository agent working agreement; avoid copying it into development docs.

## Fill in after creating a project

Maintain verified information here as the project evolves:

| Topic | What to establish |
| --- | --- |
| Source layout | Module boundaries, app entrypoints and ownership |
| Application environment | Language/runtime versions, installation, configuration, local run commands |
| Verification | Concrete test, lint, format and build commands; expected outcomes |
| Delivery | CI gates, release steps, migration and approval requirements |
| Architecture | Decisions and links to substantive design material when needed |

Prefer linking to executable configuration over duplicating it. Drop irrelevant rows rather than guessing defaults. A candidate command is not verified until run in the actual project.
