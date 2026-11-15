---
description: "Read when staging changes, choosing commit boundaries or writing commit messages."
---

# Commits

A commit should represent one coherent, reviewable change. Include the tests and documentation necessary to explain or verify that change; separate unrelated goals. Do not split mechanically by file count or combine unrelated work just to reduce commit count.

## Prepare the change

- Inspect `git status --short` and `git diff` before staging. Do not absorb unrelated or unreviewed changes.
- Stage only intended paths or hunks, for example with `git add -p` when changes overlap.
- Inspect `git diff --cached` and use `git diff --cached --check` to detect whitespace errors. Run the relevant project checks.

## Write the message

Use [`.gitmessage`](../../../.gitmessage) as the canonical message format: Conventional Commit type, optional scope and concise imperative subject. It defines type selection, length, body/footer guidance, default language and excluded attribution. Do not maintain a second type catalog here.

The template appears when Git opens an editor for `git commit`; it is not a message linter or a requirement imposed on other commit interfaces.

## Change an existing commit

Prefer a follow-up commit once work is shared. Amend or split unpublished commits only when their ownership and downstream dependencies are clear. Do not rewrite shared history without explicit coordination.
