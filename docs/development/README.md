# Development

This area covers how contributors **build, change and verify** the derived project. The template itself has no selected application language, framework, dependencies, test runner or release workflow; do not invent commands or claim checks exist before the project establishes them.

## Available foundation

- [Shared Development Tooling](tooling.md) owns the general tool bootstrap, formatting/check commands, optional Git hooks and version-update boundary.
- [Initial Agent Assets](agent-assets.md) explains the Rulesync Skill selection, upstream dependencies and their lifecycle.
- Root [AGENTS.md](../../AGENTS.md) owns the repository-wide agent working agreement; [Documentation](../README.md) routes non-development knowledge.

## Extend with verified project information

| Topic | Establish when known |
| --- | --- |
| Code orientation | Actual source layout, project entrypoints and module ownership |
| Application environment | Language/runtime, package management, setup and local run commands |
| Verification | Test, lint, format and build commands with actual scope and expected outcomes |
| Contribution and CI | Contribution workflow and checks required before integration |

Keep system design rationale in [Architecture](../architecture/README.md), deployed service procedures in [Operations](../operations/README.md) and API/configuration contracts in [Reference](../reference/README.md). Prefer links to executable configuration over copying values, and remove irrelevant placeholder rows instead of inventing defaults.
