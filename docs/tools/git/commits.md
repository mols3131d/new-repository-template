---
description: "Read when staging changes, choosing commit boundaries or writing commit messages."
---

# Commits

A commit should represent one coherent, reviewable purpose. Include related implementation, tests and documentation together; separate unrelated goals. One task or PR may require several commits. Do not split mechanically by file count or session length.

## Prepare the change

- Inspect `git status --short` and `git diff` before staging. Do not absorb unrelated or unreviewed changes.
- Stage only intended paths or hunks, for example with `git add -p` when changes overlap.
- Inspect `git diff --cached` and use `git diff --cached --check` to detect whitespace errors. Run the relevant project checks.

## Message convention

Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). The root [`.gitmessage`](../../../.gitmessage) owns the selected types and writing style.

Use `type[(scope)][!]: description`: `feat` for new features, `fix` for bug fixes, and the other listed types when appropriate. Scope is optional; indicate a breaking change with `!` before `:` and/or a `BREAKING CHANGE: ...` footer. Separate an optional body or footer from the preceding section with a blank line.

A concise subject is enough when no extra context is needed. Use the body for meaningful reasons, decisions, verification results or limitations, and next checks that the diff or linked records do not already explain. Do not claim unrun checks passed or include secrets or private conversation content.

The template appears when Git opens an editor for `git commit`; it provides guidance, not automatic message validation. Other commit interfaces should follow the same convention.

## Checkpoints and handoffs

Use [Session Recovery Checkpoint Commits](https://github.com/mols3131d/mols-agent-assets/blob/main/catalog/patterns/workflow/session-recovery-checkpoint-commits.md) when a meaningful snapshot will help resume work after a session or contributor change.

- Commit at useful, reviewable boundaries rather than solely because a session ends. A checkpoint on a work branch may be incomplete; identify material unverified scope without suggesting merge readiness.
- Record only costly-to-reconstruct decisions, actual verification outcomes and next conditions. Do not add a special checkpoint type, status field or redundant progress log to the commit message.
- On resumption, compare the checkpoint with the current ref, working tree and tests. For multi-commit progress or durable decisions, use the task/PR or project documentation instead.

## Change an existing commit

Prefer a follow-up commit once work is shared. Amend or split unpublished commits only when their ownership and downstream dependencies are clear. Do not rewrite shared history without explicit coordination.
