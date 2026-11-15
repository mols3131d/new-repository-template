---
description: "Follow when creating a project from this template and adapting example scripts, tools and CI to its technology stack."
---

# Set Up a Project from This Template

This repository is a **starter template**, not an application scaffold for a particular language. Its documentation-index generator, tests and CI are **working examples of repository automation**, not a requirement to develop in TypeScript or Node.js.

## 1. Define the new project

1. Create a repository using the GitHub template and replace the root [README](../../README.md) with the project's purpose and first-use instructions.
2. Choose the **application language and runtime**, the **script/automation language**, a test runner and the CI checks the project actually needs. They may differ from the tools included in this template.
3. Record real outcomes in [Goals](../goal/README.md), design decisions in [Architecture](../architecture/README.md), and project commands in [Development](../development/README.md). Remove or revise template-specific guidance when it no longer describes the project.
4. Review [Initial Tool Setup](../tools/initial-setup.md) before installing shared tools or resolving external Agent Skills.

## 2. Adapt the included automation

The following files demonstrate a working documentation workflow. **Do not adopt their implementation language by default.** Keep them only when they serve the new project.

| Template example | Adapt for the project |
| --- | --- |
| [Index generator](../../scripts/generate-docs-index.ts) | If retaining document indexing, rewrite it in the project's chosen scripting language, or explicitly keep TypeScript when appropriate. |
| [Generator tests](../../tests/generate-docs-index.test.ts) | Port the behavior checks to the project's test runner when the script changes. |
| [`package.json`](../../package.json), `package-lock.json`, [`tsconfig.scripts.json`](../../tsconfig.scripts.json) | Replace or remove generator-specific Node/TypeScript dependencies and commands after their consumers have been migrated. |
| [Documentation CI](../../.github/workflows/docs-index.yml) | Update the runtime, commands and file triggers for the replacement script, tests and validations. |
| [`mise.toml`](../../mise.toml), [`rulesync.jsonc`](../../rulesync.jsonc) | Keep useful shared tasks and Skills, remove unused selections and add the project's actual toolchain. Node.js may still be needed for npm-distributed CLIs even when the application and scripts use another language. |

If retaining the index, preserve the behavior relevant to the project—including deterministic output, metadata validation, read-only checks and test coverage—using the [indexing contract](../documentation/indexing.md) as the reference. Generate [`docs/INDEX.tsv`](../INDEX.tsv) from source documents instead of editing it manually.

If retiring the example index workflow, remove or replace its script, tests, npm commands, workflow and generated index, and revise references in [documentation guidance](../documentation/README.md), [agent instructions](../../AGENTS.md) and entrypoint READMEs. Do not leave broken commands or requirements for tooling the project no longer uses.

For new script implementation decisions, see [Script Maintenance](../development/scripts.md).

## 3. Verify the resulting repository

Run the new project's actual formatter, tests, build and CI checks. Confirm that generated files are reproducible, read-only checks do not modify inputs, and the documented setup commands work with the selected toolchain. Review the changes before committing, including resolved tool/Skill dependencies and generated projections.

The template's existing checks verify only its included tooling, not the resulting application's behavior.
