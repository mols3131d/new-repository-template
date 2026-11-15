---
description: "Use when deciding document ownership, progressive discovery and evidence-preserving review."
---

# Documentation Authoring and Review

Use this guide to decide where project documentation belongs, how readers find it, and how changes are reviewed. It covers human- and agent-written documents; it does not define agent activation or runtime permissions.

## Keep one owner for each subject

- Start from the [documentation map](../README.md). The repository [README](../../README.md) owns the project entrypoint; [AGENTS.md](../../AGENTS.md) owns the repository-wide agent working agreement.
- Put design decisions, implementation procedures, user instructions, and tool guidance in their respective existing areas. Link across boundaries instead of copying a contract or status.
- Treat executable configuration, source code, tests, and external specifications as their own authorities. Documentation explains their purpose and limitations without maintaining duplicate values.
- Add a document only for a distinct recurring reader question with a clear owner. Otherwise extend the nearest existing document. Split by independent questions or retrieval needs, not arbitrary file length.

## Make discovery proportional

| Starting point | Route |
| --- | --- |
| Exact document or owner known | Link directly to the file or relevant section. |
| Topic area known | Use the nearest useful directory README or the [documentation map](../README.md). |
| Several distinct documents in one area | Add a short topic selector only when it removes real search effort. |
| Topic owner unknown under `docs/` | Use the shallow [generated index](../INDEX.tsv), then follow the selected area. |

- Keep entrypoints short. Include enough scope to choose the next document, not its full contents.
- Use a clear title and [frontmatter](frontmatter.md) `description` for each ordinary document in `docs/`. It should distinguish when to read that document.
- Follow only the links that affect the current task. Preserve safety-critical prerequisites without loading unrelated documents.

## Review changes

1. Check that the destination is the canonical owner and that navigation reaches it without unnecessary hops.
2. Preserve meaningful facts, decisions, ordering, identifiers, sources, constraints, and exceptions. Distinguish implemented behavior, proposals, external claims, and actual verification evidence.
3. Remove duplicate explanations, empty sections, speculative directories, and placeholders that look like established project facts. Regenerate [the index](../INDEX.tsv) when document selection metadata changes.
4. Check relative links and Markdown with the project's configured tooling when available. Report checks not run; document text alone is not runtime evidence.

Prefer lower total reading and maintenance cost over minimum document length.
