# New Repository Template

A technology-agnostic starter for **agent-assisted development**. It prepares reusable Skills through Rulesync and general development tools through mise, without assuming an application framework or CI provider.

## Start a project

1. Select **Use this template** on GitHub, then replace this README's project description.
2. Inspect [mise.toml](mise.toml) and [agent asset selection](docs/development/agent-assets.md). Install [mise](https://mise.jdx.dev/) yourself if required.
3. After authorizing local tool installation and external Skill downloads, run these commands from the new repository:

```sh
mise install
mise run agents-setup
mise run check
```

The first `agents-setup` downloads selected upstream Skills, writes `rulesync.lock`, generates native Skill projections and maintains Rulesync's generated ignore entries. **Review and commit** the new lock and intended ignore changes; no install or generation has been executed as part of this template PR. Reinstall from an established lock with `rulesync install --frozen`, and explicitly refresh upstream Skills using `mise run agents-refresh`.

## Included foundation

| Area | Provisioning / entry |
| --- | --- |
| Reusable Agent Skills | [rulesync.jsonc](rulesync.jsonc) selects 21 Skills from [mols-agent-assets](https://github.com/mols3131d/mols-agent-assets) and 1 official Rulesync Skill |
| Cross-agent Skill generation | Claude Code, Codex CLI, GitHub Copilot, Copilot CLI, Antigravity IDE/CLI and AgentsSkills |
| General tooling | [mise.toml](mise.toml) selects rumdl, Biome, Lefthook, Rulesync and its Node runtime |
| Working agreement | [AGENTS.md](AGENTS.md) is canonical; [CHATBOT.md](CHATBOT.md) is optional chat-runtime compatibility |
| Development instructions | [Development reference](docs/development/README.md) for actual app commands and [Shared Tooling](docs/development/tooling.md) for template setup |

## Everyday commands

| Action | Command |
| --- | --- |
| Format Markdown and supported code/config files | `mise run format` (writes across repository) |
| Check Markdown, Biome and Lefthook configuration | `mise run check` |
| Preview/check Rulesync setup | `mise run agents-check` |
| Update upstream Skill revisions deliberately | `mise run agents-refresh` |

Git hook installation is **optional**, not part of the default setup. Follow [Shared Tooling](docs/development/tooling.md) for scoped formatting, hook safety and version updates. `mise run check` does not run an application test suite, and a Skill manifest does not prove runtime activation.

Derived repositories should establish their own application runtime, tests, build, CI and project-specific rules only as those needs become concrete. This template does not grant agents unattended merge/release authority.
