---
description: "Use when deciding document ownership, progressive discovery and evidence-preserving review."
---

# Documentation Authoring and Review

Use this guide to choose document ownership, navigation and review standards.

## Keep one owner for each subject

- Start from the [documentation map](../README.md) and identify the nearest owner.
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
- Use a clear title and [frontmatter](frontmatter.md) `description` for ordinary documentation. For entrypoints, apply [README authoring](readme-authoring.md) and distinguish the scope from sibling areas.

## Review changes

1. Check that the destination is the canonical owner and that navigation reaches it without unnecessary hops.
2. Preserve meaningful facts, decisions, ordering, identifiers, sources, constraints, and exceptions. Distinguish implemented behavior, proposals, external claims, and actual verification evidence.
3. Remove duplicate explanations, empty sections, speculative directories, and placeholders that look like established project facts. Follow [index maintenance](indexing.md) when document selection metadata changes.
4. Check relative links, formatting and generated indexes with the configured tooling.

## Present evidence and structure

- Use a **table** for comparisons of multiple options, responsibilities or evidence levels; use prose for short linear explanations.
- Use **Mermaid** only when relationships, branches, transitions or handoffs are difficult to follow as text. Explain essential meaning without relying on diagram rendering or color.
- Show numerical progress only for a countable, independently verified set of outcomes. State the numerator, denominator and evidence; distinguish pending, failed and unverified work.
- Avoid repeating information across prose, tables and diagrams. A proposed workflow or diagram is not evidence of implemented behavior.

Prefer lower total reading and maintenance cost over minimum document length.
