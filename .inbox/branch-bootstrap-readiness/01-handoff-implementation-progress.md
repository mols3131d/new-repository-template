---
description: "Resume PR 9 implementation: review committed bootstrap changes, verified checks, and remaining real-environment acceptance work."
---

## Current state

PR [#9](https://github.com/mols3131d/new-repository-template/pull/9) targets `main` from `chore/bootstrap-readiness` and remains **Draft**. This is a temporary work-unit handoff, not canonical policy. Read the [original work plan](00-plan-first-project-readiness.md) for requirements and the maintained project files for actual behavior. `main` was synchronized into the branch before the implementation commits.

### Completed commits

| Commit | Purpose | Canonical owners |
| --- | --- | --- |
| `937e6ead` | Reconcile PR branch with newer `main` (PR template changes included) | Merge parents: original branch and `main` |
| `8b23b4b` | Shorten first-project path and stop treating application language as a reason to port the Node documentation index | [README](../../README.md), [Project Setup](../../docs/guides/project-setup.md) |
| `d36062e` | Add `mise run agents-restore` backed by `rulesync install --frozen`; distinguish first install, locked recovery and explicit updates | [mise tasks](../../mise.toml), [Rulesync](../../docs/tools/rulesync.md), [Initial Setup](../../docs/tools/initial-setup.md) |
| `fa14038` | Add a first-task agent loading probe and derived-repository GitHub Ruleset/Actions audit steps | [Harness Verification](../../docs/development/agents/harness.md), [Project Setup](../../docs/guides/project-setup.md) |

The template intentionally **does not** contain an invented `rulesync.lock`. The first authorized install must produce the real lock, which the derived project reviews and commits. The new restore command requires a complete accepted lock, restores selected Skills, regenerates projections and maintains ignore entries. It does not install Git hooks or change the Git commit template. Shared tool versions remain major-prefix requests; `mise.lock` is an optional project-level reproducibility choice, not an assumed existing file.

## Verification performed

- GitHub Actions on implementation head `fa140385bf1861b117764ec499f0981dd2dd135f`: **two `validate` checks succeeded** (documentation-index workflow). Treat these as template documentation automation tests only.
- Static comparison with `main`: implementation touched `README.md`, `mise.toml`, the project setup, Rulesync/initial setup, and agent harness guides; original Inbox plan remains work evidence.
- Read-only structural validation: **74 local Markdown links** among eight inspected project/source files resolved in the branch tree; all changed `docs/` files retained required description frontmatter; restore task includes `--frozen`; the unchanged documentation CI has no `.inbox/**` trigger.
- The GitHub branch was advanced by commit writes only; no remote repository settings, tool installations, Git hooks, or application stack were changed.
- This review was performed through GitHub repository files and checks. It is **not** evidence that a local runtime, install or agent execution succeeded.

## Remaining acceptance and blockers

- [ ] In an explicitly authorized disposable repository generated from this template, run `mise install`, `mise run setup`, `mise run agents-check`, `mise run check`. Record actual versions and outputs; inspect the **real** generated `rulesync.lock`, projections and ignore diff before any commit. No tool/Skill installation was performed in this session.
- [ ] Re-run the setup and `mise run agents-restore` with a reviewed lock; compare `git status --short` and accepted refs before/after to verify repeatability. Exercise a lock/manifest mismatch to confirm `--frozen` fails visibly; do not quietly use `agents-refresh` to bypass it.
- [ ] Use at least one available real agent runtime on a bounded first change. Observe its actual instruction first-hop and full task-relevant Skill/reference loading, then confirm applied behavior. The repository's `CHATBOT.md` is not guaranteed to be auto-loaded. Other runtimes stay unverified.
- [ ] On that derived repository, read actual `main` Rulesets/required checks, workflow permissions, CODEOWNERS and merge policies. Do not assume GitHub-hosted settings were inherited, and **do not mutate settings** without verified administrative authority.
- [ ] Run local Markdown formatter/linter or equivalent where available; repository-native documentation CI succeeded, but local `rumdl` and `mise` CLI runs were not executed here.
- [ ] After fresh-project evidence, complete final self-review, update PR acceptance checks and remove Draft only when genuinely merge-ready. No merge is authorized by this handoff.

## Resume sequence

1. Open PR #9 and check the current branch/ref and unresolved reviews. Read this file and the [original work plan](00-plan-first-project-readiness.md); inspect the latest implementation diff before changing files.
2. Keep all substantive code/config/docs in canonical owners. Prefer small commits with distinct intent; use this Inbox document only for evidence, open work and handoff. Never store private chats, secrets, credentials or raw session transcripts.
3. Next best work: perform the authorized fresh-project setup and frozen-restore smoke checks. If the environment cannot install tools or activate a real agent, report that limitation, refine only evidence-backed contract issues and leave the PR Draft.
4. Recheck the latest GitHub Actions results and the current `main` base before any merge decision. `.inbox/**` is intentionally excluded from CI admission, although local staged Markdown can be autoformatted by the optional hook.

**Do not interpret the original plan's creation-time “prepared, not implemented” note as current implementation status.** This handoff supersedes that note for progress only; the plan still owns scope and acceptance.
