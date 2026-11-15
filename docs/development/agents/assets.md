---
description: "Read when selecting, updating or retiring Agent Assets and validating their source, projection and runtime availability."
---

# Agent Asset Lifecycle

Use this guide when changing which reusable Agent Assets a project depends on. [Instruction ownership](rule-ownership.md) determines where instructions belong; [Rulesync](../../tools/rulesync.md) owns installation and projection commands; [Harness verification](harness.md) owns evidence of actual runtime application.

## Select and change

1. Identify the task, expected behavior and intended runtime targets. Prefer a verified reusable asset over adding a local duplicate. Use the available `mols-agent-asset-find` or `mols-agent-asset` Skill when its capability is relevant and accessible.
2. Check the source's provenance, scope, compatibility and trust before changing the selection. [`rulesync.jsonc`](../../../rulesync.jsonc) owns external Skill sources and targets; the generated `rulesync.lock` records resolved revisions after an authorized install.
3. Add, refresh or remove the selection in its canonical declaration. Only with appropriate authorization, regenerate projections using [Rulesync tooling](../../tools/rulesync.md); inspect the lockfile, generated output and managed ignore changes. Do not hand-edit vendor projections or silently refresh unrelated upstream sources.
4. Review downstream references and supported runtimes before retiring an asset. If a derived project takes ownership of a local asset, establish a single maintained source rather than preserving competing upstream and local copies.

## Verify what changed

Distinguish a **declared selection** from a **generated projection**, a **runtime-reachable asset**, and **observed behavior**. A matching manifest, lockfile or generated directory cannot establish that the target runtime loaded and followed the asset. Use [Harness verification](harness.md) for representative checks and report unavailable runtimes as unverified.

This guide describes repository-level selection and maintenance. It does not redefine an asset's behavior, grant account or installation permissions, or create a new mandatory asset inventory.
