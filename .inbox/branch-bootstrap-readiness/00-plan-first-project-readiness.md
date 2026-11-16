---
description: "Use to implement and verify a reproducible first-project setup and usable agent harness from this repository template."
---

## Goal and baseline

Make a new repository created from this template ready for its **first real development task** with the fewest repeated setup and harness decisions. Keep the template language-agnostic; the selected application stack, deployment and release tooling belong to the derived project.

Baseline: `main` at `b877c5568fc6115beb7581aca428e0208fb3c17a` (2026-11-16 assessment). Recheck current refs and docs before modifying anything.

- [Root README](../../README.md) documents `mise install` → `mise run setup` → `mise run check`; [mise tasks](../../mise.toml) install tools, project Skills and the Git commit template.
- [Rulesync selection](../../rulesync.jsonc) declares 21 upstream mols Skills and one Rulesync Skill, but the template has no initial `rulesync.lock`. The [Rulesync guide](../../docs/tools/rulesync.md) currently asks each new project to generate, inspect and commit one.
- [Project setup](../../docs/guides/project-setup.md) suggests rewriting the documentation index generator in a project's scripting language. The working Node-based generator is already independent of application language.
- [Harness verification](../../docs/development/agents/harness.md) distinguishes configured, reachable and observed-applied. [CHATBOT.md](../../CHATBOT.md) is not automatically read by every chat runtime.
- [CI](../../.github/workflows/docs-index.yml) runs documentation tests only. [.inbox](../README.md) is non-canonical, ephemeral work evidence; changes there must not become merge-check dependencies.
- Local [Lefthook](../../lefthook.yml) installation is opt-in. The shared formatter and check tasks already exist; do not silently install or replace Git hooks.
- Repository settings and rulesets must be checked in each **derived** repository rather than inferred from the template's current GitHub settings.

This is a work handoff, not a new canonical policy. Implement stable changes in their existing owners; do not promote this document into runtime instructions.

## Work units

### 1. Make first setup repeatable

- Examine the current Rulesync CLI/source and existing `agents-setup`/`agents-refresh` semantics before choosing a locking approach. Decide whether a reviewed `rulesync.lock` should ship with the template, how derived repositories adopt it, and whether preserving or regenerating revisions is appropriate. Do **not** fabricate a lockfile or update remote Skills without authorization.
- Assess the value of `mise.lock` versus current major-version requests. Add version-pinning only where it materially improves repeatability without freezing new projects into obsolete dependencies.
- Clarify distinct first-install, repeat/recovery and explicit-refresh paths. Do not let routine setup silently update previously accepted revisions, rewrite unrelated files, or mutate global state.
- Preserve existing simple `mise`/Rulesync commands; prefer adjusting them over adding a separate installer, dependency solver or elaborate configuration profiles.
- Record the exact writes (`rulesync.lock`, projections, `.gitignore`, local Git config, tool caches) and approvals required; report partial failure and repair steps.

Likely owners: [mise.toml](../../mise.toml), [rulesync.jsonc](../../rulesync.jsonc), [Rulesync guide](../../docs/tools/rulesync.md), [initial tool setup](../../docs/tools/initial-setup.md).

### 2. Reduce per-project onboarding work

- Revise [project setup](../../docs/guides/project-setup.md) and [root README](../../README.md) into a short first-project path: create repository, review trust/permissions, initialize common tools and Skills, choose application stack, add that stack's build/test/CI tasks, verify a first change.
- **Do not recommend porting the existing documentation indexer solely because the application uses another language.** Retain the working Node-based documentation utility when it is useful, or remove the whole indexing chain when it is not. Keep the existing ownership and drift checks intact.
- Make clear which choices belong to each derived project (language/runtime, application tests, deploy, license, repository settings), and which common facilities work without a choice (documentation, `.inbox`, generic tooling and agent routing).
- Prefer the existing task entrypoints and minimal edits to a custom bootstrap wizard or a matrix of unused languages.

Likely owners: [project setup](../../docs/guides/project-setup.md), [README](../../README.md), [development](../../docs/development/README.md) and their genuine command/config owners.

### 3. Verify real agent usability

- Trace at least one supported runtime from the actual instruction entrypoint through applicable `AGENTS.md` and one selected Skill's **canonical body and required references**. Use the real installed projection, not just the Rulesync manifest or a filename list.
- Run a representative bounded first change and record the evidence tier (configured / reachable / observed applied). Include scope/permission-sensitive behavior where the runtime allows it.
- Treat `CHATBOT.md` as a compatibility entry that requires an explicit runtime-side first hop when native discovery is insufficient. Report missing integration rather than claiming universal chat compatibility.
- Verify additional runtimes only where they are available. Do not substitute sequential self-review for independent agent execution or treat all listed targets as proven.

Likely owners: [AGENTS.md](../../AGENTS.md), [CHATBOT.md](../../CHATBOT.md), [harness guide](../../docs/development/agents/harness.md), [agent-asset lifecycle](../../docs/development/agents/assets.md).

### 4. Check derived-repository GitHub protection

- Document a new-repository verification step for `main` protection/rulesets, permitted merge methods, required checks, least-privilege CI permissions and any Code Owner requirement **after** the repository has been created.
- Distinguish template files from GitHub-hosted settings. Do not present the template repository's ruleset as inherited proof or assume a successful documentation-index workflow validates application code.
- Keep changes to GitHub-hosted settings, remote permissions and workflows outside automatic setup unless the target account/repository and authority have been explicitly confirmed. A read-only audit or manual checklist is sufficient initially.
- Preserve the current CI design: `.inbox/**` must not trigger or fail admission checks; formatting there is a local optional hook. Add application CI only when the derived project's runtime and real tests are chosen.

Likely owners: [project setup](../../docs/guides/project-setup.md), [documentation CI](../../.github/workflows/docs-index.yml), [Lefthook guide](../../docs/tools/lefthook.md).

## Acceptance and evidence

- [ ] First-run commands are understandable, minimal and valid for the explicitly supported environment. Installation/trust/write approvals are visible before side effects.
- [ ] A fresh derived repository can complete common setup, pass template-owned checks, and start a bounded development task without manually recreating the generic harness.
- [ ] A second setup preserves accepted Skill/tool revisions, user changes and local hooks; failure/recovery paths are described and checked.
- [ ] Existing documentation indexing remains usable without forcing the application language to Node.js or porting the indexer.
- [ ] At least one available agent runtime demonstrates reachable instructions/Skill and a representative applied behavior; every other runtime is labeled unverified unless observed.
- [ ] GitHub ruleset/required-check verification for a derived repository is explicit, non-destructive and does not presume inheritance.
- [ ] `.inbox/**` remains non-canonical and outside CI admission; optional local autoformat continues to work for staged Inbox Markdown.
- [ ] No fabricated lockfiles, speculative framework, universal stack presets, auto-installed hooks or unapproved remote settings changes were introduced.
- [ ] Change-specific deterministic checks and a fresh-project smoke test are recorded with exact commands, outcomes and any unavailable environment.

## Execution order and handoff

1. Revalidate `main` and current external CLI/runtime contracts; decide the smallest reproducible setup model. If any choice introduces meaningful tradeoffs, record it in the implementation PR before editing commands.
2. Update the existing command/config and first-use documentation owners; preserve installation and permission boundaries.
3. Verify first setup, repeat setup and representative agent loading in an authorized **disposable derived repository** where practical. Never use the template's `main` as a destructive bootstrap target.
4. Run repository checks and relevant tests, compare resulting diffs and ensure `.inbox` isolation. Perform a self-review for over-design, unstated authorization, stale links and unsupported compatibility claims; keep the PR draft until substantive implementation and verification are complete.
5. Transfer durable behavior and decisions to canonical configuration/docs, update the PR `Changes` and `Verification` with actual results, and retain this Inbox record only under its existing lifecycle.

**At plan creation:** Only baseline state and scope had been inspected; no bootstrap or runtime was executed. For subsequent implementation commits, verification and remaining work, read the [session handoff](01-handoff-implementation-progress.md).
