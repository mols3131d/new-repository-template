# Development Reference

This template has no selected application language, framework, dependencies, test runner, or release workflow. Do not invent commands or claim checks exist before the derived repository implements them.

## Initial development foundation

- [Shared Development Tooling](tooling.md) explains the installed-by-request toolchain, formatting/check tasks, Git hook opt-in and version-update boundary.
- [Initial Agent Assets](agent-assets.md) owns the reusable Skill selection, Rulesync setup and external dependency lifecycle.
- Root [AGENTS.md](../../AGENTS.md) owns the repository-wide agent working agreement. Do not duplicate its policy here.

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
