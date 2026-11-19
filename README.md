# New Repository Template

A technology-agnostic starter for **agent-assisted development**. It provisions reusable Skills and prepares Rules, Commands and Subagents through Rulesync, shared tooling through mise, and GitHub Actions checks for repository tooling and documentation indexing. A derived project chooses its application language and CI workflow.

## Start a project

1. Select **Use this template** on GitHub.
2. Review [Initial Tool Setup](docs/tools/initial-setup.md) and the requested downloads, generated files and local Git changes. Install [mise](https://mise.jdx.dev/) if needed.
3. After authorizing installation and project writes, run these commands from the new repository:

```sh
mise install
mise run setup
mise run check
```

`setup` resolves the first upstream asset lock (or reuses an existing one), generates enabled runtime projections and ignore entries, and configures the clone-local [Git commit template](docs/tools/git/README.md). Inspect and commit the resulting `rulesync.lock` only after reviewing its resolved sources. Follow [Project Setup](docs/guides/project-setup.md) to select the application stack, verify agent loading and check GitHub protection for the new repository.

## Included foundation

| Area | Provisioning / entry |
| --- | --- |
| Upstream Agent Skills | [rulesync.jsonc](rulesync.jsonc) selects Skills from [mols-agent-assets](https://github.com/mols3131d/mols-agent-assets) and [Rulesync](https://github.com/dyoshikawa/rulesync) |
| Agent asset projections | Claude Code, Codex CLI, GitHub Copilot, Copilot CLI, Antigravity IDE/CLI and AgentsSkills; [configured features](rulesync.jsonc) and [asset ownership](docs/development/agents/assets.md) vary per target |
| General tooling | [mise.toml](mise.toml) selects rumdl, Biome, Lefthook, Rulesync and its Node runtime |
| Documentation | [Documentation map](docs/README.md) routes goals, architecture, development and tools; [Tools](docs/tools/README.md) owns shared tool guidance |
| Project scripts | [scripts/](scripts/README.md) is reserved for project-owned executable helpers when native tool tasks are insufficient |
| Working records | [Inbox](.inbox/README.md) keeps temporary research, reviews and handoffs separate from canonical documentation |

## Everyday commands

| Action | Command |
| --- | --- |
| Format Markdown and supported code/config files | `mise run format` (writes across repository) |
| Check Markdown, Biome and Lefthook configuration | `mise run check` |
| Check Rulesync configuration | `mise run agents-check` |
| Preview Rulesync projections (after setup) | `mise run agents-preview` |
| Restore accepted upstream revisions (requires lockfile) | `mise run agents-restore` |
| Update upstream revisions deliberately | `mise run agents-refresh` |
| Preview/apply removal of retired runtime outputs | `mise run agents-retire -- <targets> --features <features> [--apply]` |

Git hook installation is **optional**, not part of the default setup. Follow [Tools](docs/tools/README.md) for scoped formatting, hook safety and version updates. `mise run check` does not run an application test suite, and an asset selection does not prove runtime activation.

The included Node.js documentation index is a shared repository utility, **not** a required application language. Derived repositories add their application runtime, tests and CI as needed.
