# Tools

This area owns **how the project configures and uses shared development tools**. The native configuration files remain authoritative for executable settings and versions; these documents cover intent, usage, update boundaries and exceptions.

| Tool | Responsibility | Version policy |
| --- | --- | --- |
| [mise](mise.md) | External tool manager and shared tasks | Manual stable updates; not pinned by itself |
| [Node.js](node.md) | Runtime for npm-distributed CLIs | Loose: major prefix |
| [Rulesync](rulesync.md) | External Agent Skill dependencies and projections | Strict: exact CLI version |
| [rumdl](rumdl.md) | Markdown formatting and lint | Strict: minor prefix |
| [Biome](biome.md) | Code/config formatting and lint | Strict: minor prefix |
| [Lefthook](lefthook.md) | Optional local Git hook checks | Loose: major prefix |

## Version management

**Strict** tools can change formatting, configuration or generated Agent Assets: accept patch updates inside a reviewed minor line for rumdl and Biome; hold Rulesync at an exact version until its generation output is reviewed. **Loose** tools may track minor and patch updates inside a chosen major line (Node.js and Lefthook). mise itself is installed separately; review stable updates before applying them.

The actual requests and tasks live in [`mise.toml`](../../mise.toml). Prefixes do not guarantee compatibility, and this starter has no `mise.lock`: different installs can resolve different releases. Derived projects that require identical tool builds should create, test and commit a mise lockfile. External Skill revisions are a separate concern governed by [Rulesync](rulesync.md).

No application language, test framework or deployment tool is selected here.

## Initial setup

Follow [Initial Tool Setup](initial-setup.md) to review configuration, authorize installation, inspect generated files and run shared checks. These do not establish application-test results or agent-runtime activation.

Tools can be added under this directory as the project actually adopts them. Do not create a tool document for an unused candidate or duplicate native CLI manuals.
