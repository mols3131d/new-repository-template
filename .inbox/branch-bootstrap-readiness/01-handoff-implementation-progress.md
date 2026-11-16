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
- Local workspace tooling and formatting (Windows, `chore/bootstrap-readiness` with user `.rumdl.toml` updates):
  - Applied template-level fixes: added `.gitattributes` (`* text=auto eol=lf`), configured `"gitignoreDestination": "gitexclude"` on `.agents/skills/` writers (`codexcli`, `antigravity-ide`, `antigravity-cli`, `agentsskills`) in `rulesync.jsonc`, added Rulesync curated/generated exclusions to `.rumdl.toml`, separated pre-setup `agents-check` from post-setup `agents-preview` in `mise.toml`, aligned `biome.json` `$schema` to `2.6.7`, removed unused `path` warning in `tests/generate-docs-index.test.ts`, and added `.github/workflows/repo-checks.yml` (excluding `.inbox/**`).
  - Extracted `mise.toml` `agents-*` workflows into a zero-dependency CLI `scripts/manage-agent-assets.ts` (covered by `tests/manage-agent-assets.test.ts`), deriving `--targets` and `--features` for `rulesync gitignore` from `rulesync.jsonc`, providing concise `--help`/`-h` across both CLIs, and surfacing GitHub rate-limit/partial-lock hints when `install` fails.
  - Addressed independent PR #9 review findings, enabled `"delete": true`, and trimmed duplicate Rulesync checks: added `npm ci --ignore-scripts` and `npm run typecheck:scripts` to `.github/workflows/repo-checks.yml`, enabled `"delete": true` in `rulesync.jsonc` (orphan sweep during `generate`/`preview`), simplified `manage-agent-assets.ts` so Rulesync natively handles schema, lockfile, `.rulesync`, and Git-root checks while keeping minimal JSONC target/feature extraction for `rulesync gitignore`, added `!.inbox` exclusion to `biome.json`, eliminated 15 `lint/style/useTemplate` infos in `scripts/generate-docs-index.ts`, and updated `docs/tools/rulesync.md`, `docs/tools/mise.md`, `docs/tools/initial-setup.md`, and `docs/guides/project-setup.md`.
  - `mise run format`: all `rumdl` and `biome` formatting clean.
  - Latest verification run: `mise run agents-check` (`exit 0`), `node --test tests/manage-agent-assets.test.ts` (`4/4` pass), `mise run check` (`rumdl check .` 51 files 0 issues, `rumdl fmt --check .` 0 issues, `biome check .` 14 files 0 errors / 0 warnings / 0 infos, `lefthook validate` All good), `typecheck:scripts` (`exit 0`), `test:docs` (`15/15` pass), `docs:index:check` (`exit 0`), and `docs:frontmatter:check` (2/2 valid).
- Local disposable derived-repository smoke tests (isolated temporary clones of `chore/bootstrap-readiness`, cleaned up and untrusted afterward):
  - Initial pass (before `.gitattributes` and `gitexclude` config changes): verified `mise install` (`node 26.13.0`, `rumdl 0.3.4`, `biome 2.6.7`, `lefthook 2.2.2`, `rulesync 43.8.2`), pre-setup `generate --dry-run` failure, unauthenticated GitHub 403/429 rate-limit partial-lock failure and `--frozen` failure (`exit 1`), authenticated `mise run setup` (`exit 0`), repeat `mise run setup` (`exit 0`, lock unchanged), clean `mise run agents-restore` (`exit 0`, lock unchanged), and mismatch `--frozen` failure (`exit 1`).
  - Fresh `git clone` verification pass (after `scripts/manage-agent-assets.ts` and all improvements, **without `node_modules`**): fresh clone on Windows (`core.autocrlf = true`) checked out LF cleanly (`git status --short` clean; `git ls-files --eol` `i/lf w/lf`), passed `agents-check`, `tests/manage-agent-assets.test.ts` (`9/9`), `check`, `docs:index:check`, `docs:frontmatter:check`, `typecheck:scripts`, and `test:docs` (when `npm ci` present), failed cleanly (`exit 1`) on `agents-restore` without `rulesync.lock`, and after authenticated `mise run setup`, wrote `**/.agents/skills/` solely to `.git/info/exclude` while keeping `.gitignore` entries and leaving `.gitattributes` untouched; `mise run agents-preview`, `mise run agents-restore`, `mise run check`, and `rumdl check --respect-gitignore=false .` all exited `0`.
- Read-only baseline inspection of `mols3131d/new-repository-template` via `gh api`: active `main` Ruleset `27315492` enforces `deletion`, `non_fast_forward`, and `pull_request` (`allowed_merge_methods: ["merge"]`, `required_approving_review_count: 0`, no `required_status_checks`); Actions enabled with all actions allowed.
- Antigravity IDE (`antigravity-ide`) natively discovered and loaded `AGENTS.md` in this session, and installed `.agents/skills/` files (e.g., `mols-documentation/SKILL.md`, references, `rulesync/SKILL.md`) were verified readable in the disposable clone.

## Remaining acceptance and blockers

- [x] In a local disposable clone, run `mise install`, `mise run setup`, `mise run agents-check`, `mise run agents-preview`, `mise run check`, repeat `mise run setup`, clean `mise run agents-restore`, and mismatch `--frozen` failure check; document discovered rate-limit/partial-lock, pre-setup `agents-check` vs `agents-preview`, and Antigravity `gitexclude` handling in canonical docs and config. (Remote GitHub-hosted disposable template repo creation was not run without explicit authorization.)
- [ ] Run a bounded first task with an actual agent runtime in the configured `.git/info/exclude` Skills environment to observe end-to-end Skill loading and applied behavior; other targets (`claudecode`, `codexcli`, `copilot`, `copilotcli`, `antigravity-cli`, `agentsskills`) stay **unverified**.
- [ ] On an explicitly authorized **GitHub-hosted** derived repository, inspect actual `main` Rulesets/required checks, workflow permissions, `CODEOWNERS` and merge policies. Do not assume template settings inherit or mutate settings without verified administrative authority.
- [x] Run local `rumdl`, `biome`, `lefthook`, and Node documentation checks (`typecheck:scripts`, `test:docs`, `docs:index:check`, `docs:frontmatter:check`, `mise run format`, `mise run check`), and verify Windows LF checkout via `.gitattributes` in a fresh clone.
- [ ] Review local formatting and doc changes, commit/push when ready, recheck GitHub Actions on the updated head, update PR #9 body (`Changes`/`Verification`), and remove Draft only when genuinely merge-ready. No merge is authorized by this handoff.

## Resume sequence

1. Open PR #9 and check the current branch/ref and unresolved reviews. Read this file and the [original work plan](00-plan-first-project-readiness.md); inspect the latest implementation diff before changing files.
2. Keep all substantive code/config/docs in canonical owners. Prefer small commits with distinct intent; use this Inbox document only for evidence, open work and handoff. Never store private chats, secrets, credentials or raw session transcripts.
3. Next best work: perform the authorized fresh-project setup and frozen-restore smoke checks. If the environment cannot install tools or activate a real agent, report that limitation, refine only evidence-backed contract issues and leave the PR Draft.
4. Recheck the latest GitHub Actions results and the current `main` base before any merge decision. `.inbox/**` is intentionally excluded from CI admission, although local staged Markdown can be autoformatted by the optional hook.

**Do not interpret the original plan's creation-time “prepared, not implemented” note as current implementation status.** This handoff supersedes that note for progress only; the plan still owns scope and acceptance.
