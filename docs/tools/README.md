---
description: "Find installed development tools, version management policy and initial environment setup."
---

# Tools

[`mise.toml`](../../mise.toml) owns shared CLI requests and tasks. Git and mise itself are installed separately.

| Tool | Responsibility | Version policy |
| --- | --- | --- |
| [mise](mise.md) | External tool manager and shared tasks | Manual stable updates; not pinned by itself |
| [Git](git/README.md) | Commits, branches, integration and recovery | External; not provisioned by mise |
| [Node.js](node.md) | Runtime for npm-distributed CLIs | Loose review: major prefix |
| [Rulesync](rulesync.md) | External Agent Skill dependencies and projections | Strict review: major prefix |
| [rumdl](rumdl.md) | Markdown formatting and lint | Strict review: major prefix |
| [Biome](biome.md) | Code/config formatting and lint | Strict review: major prefix |
| [Lefthook](lefthook.md) | Optional local Git hook checks | Loose review: major prefix |

## Version management

[`mise.toml`](../../mise.toml) requests major versions, not exact builds. **Strict review** for rumdl, Biome and Rulesync means checking release changes, validations and generated diffs even for minor upgrades. **Loose review** for Node.js and Lefthook focuses on compatibility. These labels affect review effort, not version constraints.

Major prefixes can resolve differently over time; rumdl (`0.x`) may break on minor upgrades. Projects needing reproducible tool versions should validate and commit `mise.lock`. [Rulesync](rulesync.md) tracks upstream Skill revisions separately. Review mise's own stable releases before upgrading it.

## Initial setup

Follow [Initial Tool Setup](initial-setup.md) to install dependencies and verify the results.
