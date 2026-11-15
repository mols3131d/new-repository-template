---
description: "Follow when creating a project from this template and adapting example scripts, tools and CI to its technology stack."
---

# Set Up a Project from This Template

The template provisions **shared agent and documentation tooling**, not an application framework. Keep the included Node.js documentation indexer independently of the application's language when it remains useful.

## First project

1. Create a repository using **Use this template**. Replace the root [README](../../README.md) with the new project's purpose and first-use instructions. Review the inherited [license](../../LICENSE) and keep legally required notices.
2. Review [Initial Tool Setup](../tools/initial-setup.md), the sources in [Rulesync](../../rulesync.jsonc) and [mise](../../mise.toml), and approve their external downloads and project/local writes before running `mise install`, `mise run setup` and `mise run check`.
3. Inspect the generated `rulesync.lock`, runtime projections and managed ignore entries; commit only reviewed intended artifacts. Run `mise run agents-check`. For later reinstallations use `mise run agents-restore` with the accepted lock rather than updating upstream revisions.
4. Choose the **application** language/runtime, its build and test commands and appropriate application CI. Add only the tools the project needs. The shared Node.js scripts and npm CLI tools may coexist with an application in another language.
5. Record actual outcomes in [Goals](../goal/README.md), technical decisions in [Architecture](../architecture/README.md), and working commands in [Development](../development/README.md). Remove guidance that describes only the starter.
6. Verify at least one actual agent's instruction/Skill loading path using [Harness Verification](../development/agents/harness.md). Inspect the new repository's GitHub protection and required checks as described below.

## Keep or remove the documentation example

The [index generator](../../scripts/generate-docs-index.ts), [tests](../../tests/generate-docs-index.test.ts), npm configuration ([package.json](../../package.json), [lockfile](../../package-lock.json), [TypeScript config](../../tsconfig.scripts.json)) and [CI workflow](../../.github/workflows/docs-index.yml) are one functioning documentation utility. **Do not port them merely because the application uses another language.**

- **Keep (default when useful):** retain the script, tests and CI independently. Rename the package to the derived project when appropriate and synchronize its npm lockfile. Add application test/build jobs separately; a passing documentation workflow is not an application test.
- **Retire (only when unnecessary):** remove the generator, its tests, dependent npm commands/toolchain, workflow and `docs/INDEX.tsv` as a coherent change. Repair [document navigation](../documentation/README.md), [agent routing](../../AGENTS.md) and links to the retired index. Do not keep stale discovery instructions or checks.

If keeping the index, use its [indexing contract](../documentation/indexing.md) for deterministic output, metadata validation and read-only drift checks. Do not edit generated `docs/INDEX.tsv` directly. Keep shared [mise](../../mise.toml) and [Rulesync](../../rulesync.jsonc) configuration only as needed; update the lock when changing selected sources.

## Check the new GitHub repository

GitHub template files and GitHub-hosted settings are different surfaces. **Do not assume this template's Ruleset, branch protection, required checks, code-owner review, repository permissions or merge settings were copied.** In the newly created repository, inspect the actual `main` Ruleset/protection, allowed merge methods, required check names, workflow permissions and any applicable code-owner requirements. Enable or change settings only under that repository's verified owner/authority; this setup does not change hosted settings automatically.

Before considering the new project ready, verify its shared formatter/index checks, application-specific checks when defined, a representative agent task, and the effect of running setup twice. Inspect `git status --short` and document unavailable runtime or GitHub checks as **unverified**, not passed. The `.inbox/` remains temporary evidence excluded from documentation CI; local formatting hooks are [opt-in](../tools/lefthook.md).
