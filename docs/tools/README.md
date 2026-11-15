---
description: "Find installed development tools, version management policy and initial environment setup."
---

# Tools

Shared tool configuration lives in [`mise.toml`](../../mise.toml); these guides cover usage, compatibility and updates.

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

Tools declared in [`mise.toml`](../../mise.toml) use **major-version** requests. **Strict review** applies to rumdl, Biome and Rulesync because formatting, configuration or generated Agent Assets can change: inspect releases, run relevant checks and review diffs on upgrades, including minor releases. **Loose review** applies to Node.js and Lefthook: check runtime and hook compatibility. The strict/loose labels describe verification effort, **not narrower version constraints**. mise itself is installed separately; review stable updates before applying them.

The actual requests and tasks live in [`mise.toml`](../../mise.toml). Major prefixes do not guarantee compatibility, especially for pre-1.0 tools such as rumdl (`0.x`), whose minor releases may introduce breaking changes. This starter has no `mise.lock`: different installs can resolve different releases. Derived projects that require identical tool builds should create, test and commit a mise lockfile. External Skill revisions are a separate concern governed by [Rulesync](rulesync.md).

## Initial setup

Follow [Initial Tool Setup](initial-setup.md) to install dependencies and verify the results.
