---
description: "Start here to bootstrap the agent-assisted repository template and its shared development tools."
---

# New Repository Template

A technology-agnostic starter for **agent-assisted development**. It prepares reusable Skills through Rulesync and general development tools through mise, without assuming an application framework or CI provider.

## Start a project

1. Select **Use this template** on GitHub, then replace this README's project description.
2. Review [Initial Tool Setup](docs/tools/initial-setup.md) and the declared configuration. Install [mise](https://mise.jdx.dev/) yourself if required.
3. After authorizing local tool installation and external Skill downloads, run these commands from the new repository:

```sh
mise install
mise run agents-setup
mise run check
```

The first `agents-setup` resolves upstream Skills and generates a `rulesync.lock` plus runtime projections and ignore changes. Review and commit only intended changes; [Initial Tool Setup](docs/tools/initial-setup.md) covers verification and future updates.

## Included foundation

| Area | Provisioning / entry |
| --- | --- |
| Reusable Agent Skills | [rulesync.jsonc](rulesync.jsonc) selects 21 Skills from [mols-agent-assets](https://github.com/mols3131d/mols-agent-assets) and 1 official Rulesync Skill |
| Cross-agent Skill generation | Claude Code, Codex CLI, GitHub Copilot, Copilot CLI, Antigravity IDE/CLI and AgentsSkills |
| General tooling | [mise.toml](mise.toml) selects rumdl, Biome, Lefthook, Rulesync and its Node runtime |
| Working agreement | [AGENTS.md](AGENTS.md) is canonical; [CHATBOT.md](CHATBOT.md) is optional chat-runtime compatibility |
| Documentation | [Documentation map](docs/README.md) routes goals, architecture, development and tools; [Tools](docs/tools/README.md) owns shared tool guidance |
| Project scripts | [scripts/](scripts/README.md) is reserved for project-owned executable helpers when native tool tasks are insufficient |

## Everyday commands

| Action | Command |
| --- | --- |
| Format Markdown and supported code/config files | `mise run format` (writes across repository) |
| Check Markdown, Biome and Lefthook configuration | `mise run check` |
| Preview/check Rulesync setup | `mise run agents-check` |
| Update upstream Skill revisions deliberately | `mise run agents-refresh` |

Git hook installation is **optional**, not part of the default setup. Follow [Tools](docs/tools/README.md) for scoped formatting, hook safety and version updates. `mise run check` does not run an application test suite, and a Skill manifest does not prove runtime activation.

Derived repositories should establish their own application runtime, tests, build, CI and project-specific rules only as those needs become concrete. This template does not grant agents unattended merge/release authority.
