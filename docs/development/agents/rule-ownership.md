---
description: "Read when choosing root, scoped, path-matched or task-selected agent instructions."
---

# Agent Instruction Ownership

Use this guide to choose where an instruction belongs. **Ownership** and **runtime activation** are separate decisions.

## Choose the smallest applicable surface

| Applies when | Candidate surface |
| --- | --- |
| Every repository task | Root `AGENTS.md` for common constraints and required routing. |
| Working inside a specific subtree | A scoped `AGENTS.md` for that subtree's unique requirements, if needed. |
| A supported runtime matches a path or filename pattern | That runtime's native path-scoped rule mechanism, with its actual matcher and precedence. |
| A task needs a reusable capability selected by intent | A task-selected Skill, discovered and loaded through the runtime's supported mechanism. |

- Keep human-readable topical guidance with its subject owner (for example, [documentation practices](../../documentation/authoring.md)). Entrypoints link to it; they do not duplicate its rules.
- Do not add a scoped rule, local override, or Skill solely to fill a category. Use runtime-specific local instruction files only when support, repository exclusion, and safety boundaries are established; never commit secrets.

## Verify scope and activation

Test representative applicable and non-applicable tasks. Check the actual loaded source and behavior, not merely a manifest or generated file. [Harness verification](harness.md) defines the evidence levels.
