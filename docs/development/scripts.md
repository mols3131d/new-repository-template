---
description: "Read when implementing, updating or validating project-owned scripts and their generated outputs."
---

# Script Maintenance

Use when writing or changing scripts in [`scripts/`](../../scripts/README.md).

## Choose the smallest implementation

Prefer existing native CLIs and tasks defined in [`mise.toml`](../../mise.toml). Add a project-owned script only when the behavior requires logic that those commands cannot express clearly.

Use the repository's supported runtime and maintain a clear interface: documented arguments, exit codes, deterministic output and defined side effects. Keep canonical configuration with its owning tool and do not hand-edit generated files.

## Preserve checks and consumers

- A check or validation command must be **read-only**. Keep writes behind explicit generate, update or formatting operations.
- Preserve CLI behavior and generated-file formats unless an intentional change updates consumers.
- When changing a script, review its callers, associated tests, generated output, dependency declarations, and relevant documentation.
- Run applicable tests, type checks and drift detection; distinguish static review from executed checks.

For the document-index generator, use [indexing guidance](../documentation/indexing.md) and [generator tests](../../tests/scripts/generate-docs-index.test.ts).
