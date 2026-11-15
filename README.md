# New Repository Template

A technology-agnostic starter for **agent-assisted development**. It provides reusable Skills through Rulesync, shared tooling through mise, and an example GitHub Actions documentation check. A derived project chooses its application language and CI workflow.

## Start a project

1. Select **Use this template** on GitHub.
2. Review [Initial Tool Setup](docs/tools/initial-setup.md) and the requested downloads, generated files and local Git changes. Install [mise](https://mise.jdx.dev/) if needed.
3. After authorizing installation and project writes, run these commands from the new repository:

```sh
mise install
mise run setup
mise run check
```

`setup` resolves the first Skill lock (or reuses an existing one), generates runtime projections and ignore entries, and configures the clone-local [Git commit template](docs/tools/git/README.md). Inspect and commit the resulting `rulesync.lock` only after reviewing its resolved sources. Follow [Project Setup](docs/guides/project-setup.md) to select the application stack, verify agent loading and check GitHub protection for the new repository.

## Included foundation

| Area | Provisioning / entry |
| --- | --- |
| Reusable Agent Skills | [rulesync.jsonc](rulesync.jsonc) selects 21 Skills from [mols-agent-assets](https://github.com/mols3131d/mols-agent-assets) and 1 official Rulesync Skill |
| Cross-agent Skill generation | Claude Code, Codex CLI, GitHub Copilot, Copilot CLI, Antigravity IDE/CLI and AgentsSkills |
| General tooling | [mise.toml](mise.toml) selects rumdl, Biome, Lefthook, Rulesync and its Node runtime |
| Documentation | [Documentation map](docs/README.md) routes goals, architecture, development and tools; [Tools](docs/tools/README.md) owns shared tool guidance |
| Project scripts | [scripts/](scripts/README.md) is reserved for project-owned executable helpers when native tool tasks are insufficient |
| Working records | [Inbox](.inbox/README.md) keeps temporary research, reviews and handoffs separate from canonical documentation |

## Everyday commands

| Action | Command |
| --- | --- |
| Format Markdown and supported code/config files | `mise run format` (writes across repository) |
| Check Markdown, Biome and Lefthook configuration | `mise run check` |
| Preview/check Rulesync setup | `mise run agents-check` |
| Restore accepted Skill revisions (requires lockfile) | `mise run agents-restore` |
| Update upstream Skill revisions deliberately | `mise run agents-refresh` |

Git hook installation is **optional**, not part of the default setup. Follow [Tools](docs/tools/README.md) for scoped formatting, hook safety and version updates. `mise run check` does not run an application test suite, and a Skill manifest does not prove runtime activation.

The included Node.js documentation index is a shared repository utility, **not** a required application language. Derived repositories add their application runtime, tests and CI as needed.
