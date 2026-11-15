---
description: "Read when staging changes, choosing commit boundaries or writing commit messages."
---

# Commits

Commit one reviewable purpose, including its related code, tests and documentation. Separate unrelated goals; do not split by file count or session length. A task or PR may need multiple commits.

## Prepare the change

- Inspect `git status --short` and `git diff` before staging. Do not absorb unrelated or unreviewed changes.
- Stage only intended paths or hunks, for example with `git add -p` when changes overlap.
- Inspect `git diff --cached` and use `git diff --cached --check` to detect whitespace errors. Run the relevant project checks.

## Message convention

Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). The root [`.gitmessage`](../../../.gitmessage) owns the selected types and writing style.

Format: `type[(scope)][!]: description`. Use `feat` for features and `fix` for bug fixes; other types are listed in the template. Scope is optional. Mark breaking changes with `!` and/or a `BREAKING CHANGE: ...` footer. Separate optional body and footers with blank lines.

A subject alone is enough for simple changes. Add reasons, decisions, real verification limits or next checks only if the diff and linked records cannot supply them. Never claim unrun checks passed or expose secrets or private conversations.

The template guides editor-based commits only; `git commit -m` bypasses it. It does not validate messages.

## Checkpoints and handoffs

For session or contributor handoffs, follow [Session Recovery Checkpoint Commits](https://github.com/mols3131d/mols-agent-assets/blob/main/catalog/patterns/workflow/session-recovery-checkpoint-commits.md).

- Commit at meaningful boundaries, not merely at session end. An incomplete work-branch checkpoint must identify material unverified scope without implying merge readiness.
- Record only costly-to-reconstruct decisions, actual checks and next conditions; no special checkpoint type, status field or redundant log.
- On resumption, verify the current ref, working tree and tests. Keep longer-term progress and decisions in the task, PR or project documentation.

## Change an existing commit

Prefer a follow-up commit once work is shared. Amend or split unpublished commits only when their ownership and downstream dependencies are clear. Do not rewrite shared history without explicit coordination.
