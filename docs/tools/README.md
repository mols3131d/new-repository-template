# Tools

This area owns **how the project configures and uses shared development tools**. The native configuration files remain authoritative for executable settings and versions; these documents cover intent, usage, update boundaries and exceptions.

| Tool | Responsibility |
| --- | --- |
| [mise](mise.md) | Tool version declarations and project tasks |
| [Rulesync](rulesync.md) | External Agent Skill dependencies and target projections |
| [rumdl](rumdl.md) | Markdown formatting and lint |
| [Biome](biome.md) | JSON/JSONC and JavaScript/TypeScript formatting and lint |
| [Lefthook](lefthook.md) | Optional local Git hook checks |

Node.js is installed through mise for npm-distributed CLI tools; that is not a commitment to Node.js as the application's runtime. No application language, test framework or deployment tool is selected here.

## Initial setup

Follow [Initial Tool Setup](initial-setup.md) to review configuration, authorize installation, inspect generated files and run shared checks. These do not establish application-test results or agent-runtime activation.

Tools can be added under this directory as the project actually adopts them. Do not create a tool document for an unused candidate or duplicate native CLI manuals.
