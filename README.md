# Repository Template

A minimal, technology-agnostic starting point for a new repository with an agent-readable working agreement. No language, build system, test runner, or CI workflow has been selected.

## Start a project

1. Use GitHub's **Use this template** action to create a new repository.
2. Replace this README with the project's purpose, layout, setup, and usage instructions.
3. Record **verified** development commands and conventions in [docs/development/README.md](docs/development/README.md). Do not leave example commands presented as working commands.
4. Review the existing Python-oriented `.gitignore` for the new stack, and add tests or CI only when the real project requires them.
5. Adjust the repository instructions as project-specific requirements become known.

## Agent harness

| File | Responsibility |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Canonical repository-wide baseline for agents |
| [CHATBOT.md](CHATBOT.md) | Optional compatibility entrypoint for chat runtimes |
| [docs/development/README.md](docs/development/README.md) | Project-specific development commands and engineering decisions |
| [.github/pull_request_template.md](.github/pull_request_template.md) | Lightweight PR handoff and verification record |

Local coding agents should use their native `AGENTS.md` discovery. Chat runtimes that do not discover repository instructions automatically must be explicitly pointed at `CHATBOT.md` (or `AGENTS.md`). Creating these files does not install any agent skills, enable tooling, or guarantee runtime instruction loading.

This template deliberately does not include empty Skill/Rule/Subagent catalogs, unconfigured automation, or speculative project policies.
