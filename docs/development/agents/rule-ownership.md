---
description: "Read when choosing root, scoped, path-matched or task-selected agent instructions."
---

# Agent Instruction Ownership

Use this guide when deciding where an instruction or agent-facing capability belongs. **Content ownership** and **how a runtime activates it** are separate decisions. [Root instructions](../../../AGENTS.md) remain the repository-wide working agreement.

## Choose the smallest applicable surface

| Applies when | Candidate surface |
| --- | --- |
| Every repository task | Root `AGENTS.md` for common constraints and required routing. |
| Working inside a specific subtree | A scoped `AGENTS.md` for that subtree's unique requirements, if needed. |
| A supported runtime matches a path or filename pattern | That runtime's native path-scoped rule mechanism, with its actual matcher and precedence. |
| A task needs a reusable capability selected by intent | A task-selected Skill, discovered and loaded through the runtime's supported mechanism. |

- Keep human-readable topical guidance with its subject owner (for example, [documentation practices](../../documentation/authoring.md)). Entrypoints link to it; they do not duplicate its rules.
- Do not assume a universal precedence order or portable Glob syntax across agents. A file's location, extension, or existence alone does not prove the runtime reads it.
- Declare external Skill selection in [`rulesync.jsonc`](../../../rulesync.jsonc). Follow [Rulesync guidance](../../tools/rulesync.md) for installation and generated projections; do not treat generated copies as independent sources.
- Do not add a scoped rule, local override, or Skill solely to fill a category. Use runtime-specific local instruction files only when support, repository exclusion, and safety boundaries are established; never commit secrets.

## Verify scope and activation

Test representative applicable and non-applicable tasks. Check the actual loaded source and behavior, not merely a manifest or generated file. [Harness verification](harness.md) defines the evidence levels.

Instruction placement cannot grant new account access, execution permissions, merge authority, or release authority.
