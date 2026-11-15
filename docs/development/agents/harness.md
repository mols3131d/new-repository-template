---
description: "Read when checking whether an agent runtime discovers and applies project instructions or Skills."
---

# Agent Harness Verification

Use this guide to check whether project instructions and selected Skills are actually reachable and followed in a particular agent runtime. It defines evidence levels, not a new runtime-specific instruction priority rule.

## Trace the real loading path

1. Identify the selected runtime, repository and ref, task, relevant paths, and intended account or permission context.
2. Confirm which native entrypoints the runtime reads. [Root `AGENTS.md`](../../../AGENTS.md) is the repository's canonical agreement; [`CHATBOT.md`](../../../CHATBOT.md) is a compatibility entrypoint **only when configured to be read**.
3. Resolve applicable subtree instructions and any verified native path rules, following [instruction ownership](rule-ownership.md). Never assume all runtimes share discovery or precedence semantics.
4. Identify task-relevant Skills from the available runtime, declaration, or installation. Load the actual content and needed references; [`rulesync.jsonc`](../../../rulesync.jsonc) only declares selection.
5. Carry out a safe representative task and compare observed behavior with the instructions it should apply. A bridge or declaration does not supply missing tools or authorization.

## Record the evidence level

| Level | What to verify | Does not prove |
| --- | --- | --- |
| Configured | Source, selector, target and any declared revision exist. | The runtime can read them. |
| Reachable | The runtime actually discovers and loads the correct applicable content. | The task follows it. |
| Observed applied | A representative task follows the expected instruction and permission boundary. | Compatibility with untested tasks or runtimes. |

Useful probes include a documentation edit routed to [documentation practices](../../documentation/authoring.md), a scoped task when a scoped instruction exists, a task needing a selected Skill, and a permission-sensitive action with ambiguous authority. Do not claim a probe passed without its observed trace.

Record the runtime/version when known, ref, task, expected sources, observed loading and actions, checks and outcomes, and unresolved gaps. Distinguish static inspection from runtime evidence. Do not claim measured performance savings without comparable measurements.
