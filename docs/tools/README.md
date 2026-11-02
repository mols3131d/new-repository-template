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

## Setup and verification

Review [mise.toml](../../mise.toml) before installing anything. With the intended installation permissions, `mise install` prepares the declared tools; `mise run check` checks general formatting/lint and the hook configuration. `mise run agents-setup` downloads external Skills and generates supported runtime projections. These are distinct from application tests and from proof of Skill activation.

Tools can be added under this directory as the project actually adopts them. Do not create a tool document for an unused candidate or duplicate native CLI manuals.
