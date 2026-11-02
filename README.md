# New Repository Template

A technology-agnostic repository starter with a **Rulesync-managed agent Skill baseline** and a small development-environment bootstrap. It does not assume a product language, framework, build command, or CI provider.

## Create a repository

1. Select **Use this template** on GitHub.
2. Replace this README's project description and document the actual application stack as it becomes known.
3. Install [mise](https://mise.jdx.dev/) yourself if it is not available. Review the tools in [mise.toml](mise.toml) before provisioning.
4. Run the following from the **new repository**, after authorizing the local tool installation and remote Skill download:

```sh
mise install
mise run agents-setup
```

The first `agents-setup` resolves the selected external Skills, writes `rulesync.lock`, generates project-local Skill projections for configured agents, and maintains Rulesync's generated `.gitignore` block. Inspect and **commit `rulesync.lock` and any intended `.gitignore` changes** to establish a reproducible project baseline. The upstream Skill bodies and generated projections are not checked into this template.

Later, use `mise run agents-setup` to reinstall from the existing lock, `mise run agents-check` for static configuration/generation checks, or `mise run agents-refresh` when you explicitly want upstream changes. Review the lockfile diff before accepting updates. To enforce unchanged dependencies after a lock exists, use `rulesync install --frozen`. Requires network access for first install and any missing dependencies. These commands have **not** been run in this template PR.

## Included agent capabilities

`rulesync.jsonc` selects **21 reusable Skills** from [mols-agent-assets](https://github.com/mols3131d/mols-agent-assets) and the official `rulesync` Skill. They cover initial harness setup, environment/bootstrap design, CI and tests, coding judgment, research, GitHub context, code review, dependency inspection, documentation, and iterative improvement.

See [Agent assets and selection](docs/development/agent-assets.md) for the complete selection, exclusions, update procedure, and source-of-truth boundary.

| Entry | Responsibility |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Repository-wide agent instructions (canonical baseline) |
| [CHATBOT.md](CHATBOT.md) | Opt-in compatibility entry for chat runtimes |
| [rulesync.jsonc](rulesync.jsonc) | External Skill selection and native projection targets |
| [mise.toml](mise.toml) | Initial agent tooling and explicit setup/check/update tasks |
| [Development reference](docs/development/README.md) | Actual application development commands and choices once established |

The presence of a manifest or Skill source does not imply an agent runtime has loaded it. Native Skill discovery is preferred; a chat runtime that cannot discover instructions must be configured to read `CHATBOT.md` or `AGENTS.md`.

This template intentionally does **not** install a language toolchain, tests, CI, agent autonomy, or automatic merges for unknown future projects.
