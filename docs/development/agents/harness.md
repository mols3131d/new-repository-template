---
description: "Read when checking whether an agent runtime discovers and applies project instructions or Skills."
---

# Agent Harness Verification

Check whether selected instructions and Skills are actually reachable and followed in a given runtime.

## Trace the real loading path

1. Identify the selected runtime, repository and ref, task, relevant paths, and intended account or permission context.
2. Observe which task-relevant instructions and Skills the runtime actually loads; verify path selectors and the loaded content against [instruction ownership](rule-ownership.md).
3. Run a representative task and compare its observed behavior with the expected contract.

## First-project smoke probe

Use one **available** runtime and a bounded change on a separate working branch (for example, a small documentation edit). Do not run a destructive bootstrap on `main`.

1. Identify the runtime's actual entrypoint and check whether it loads applicable `AGENTS.md` instructions or another runtime-supported instruction source. A file's presence alone is not evidence of loading.
2. Observe the loaded root and task-scoped instructions. For a documentation edit, trace a relevant Skill from [Rulesync selection](../../../rulesync.jsonc) through its **installed/source-reachable `SKILL.md`** and any references needed by the task; the manifest and generated path list alone do not prove loading.
3. Make the authorized edit, review its diff and execute applicable checks. Note whether the agent followed applicable instruction, source authority and write/permission boundaries. A successfully written file without an observed instruction/Skill trace cannot prove activation.
4. Record the runtime/version (if known), repository/ref, entrypoint, actually loaded files and refs, task/result, executed commands, evidence tier and unavailable checks. Label other listed runtimes **unverified** unless separately observed.

## Record the evidence level

| Level | What to verify | Does not prove |
| --- | --- | --- |
| Configured | Source, selector, target and any declared revision exist. | The runtime can read them. |
| Reachable | The runtime actually discovers and loads the correct applicable content. | The task follows it. |
| Observed applied | A representative task follows the expected instruction and permission boundary. | Compatibility with untested tasks or runtimes. |

Useful probes include a documentation edit routed to [documentation practices](../../documentation/authoring.md), a scoped task when a scoped instruction exists, a task needing a selected Skill, and a permission-sensitive action with ambiguous authority. Do not claim a probe passed without its observed trace.

Record the runtime and ref, expected sources, observed loading, task outcome and unresolved gaps. Keep static inspection distinct from runtime evidence.
