---
description: "Read when checking whether an agent runtime discovers and applies project instructions or Skills."
---

# Agent Harness Verification

Check whether selected instructions and Skills are actually reachable and followed in a given runtime.

## Trace the real loading path

1. Identify the selected runtime, repository and ref, task, relevant paths, and intended account or permission context.
2. Observe which task-relevant instructions and Skills the runtime actually loads; verify path selectors and the loaded content against [instruction ownership](rule-ownership.md).
3. Run a representative task and compare its observed behavior with the expected contract.

## Record the evidence level

| Level | What to verify | Does not prove |
| --- | --- | --- |
| Configured | Source, selector, target and any declared revision exist. | The runtime can read them. |
| Reachable | The runtime actually discovers and loads the correct applicable content. | The task follows it. |
| Observed applied | A representative task follows the expected instruction and permission boundary. | Compatibility with untested tasks or runtimes. |

Useful probes include a documentation edit routed to [documentation practices](../../documentation/authoring.md), a scoped task when a scoped instruction exists, a task needing a selected Skill, and a permission-sensitive action with ambiguous authority. Do not claim a probe passed without its observed trace.

Record the runtime and ref, expected sources, observed loading, task outcome and unresolved gaps. Keep static inspection distinct from runtime evidence.
