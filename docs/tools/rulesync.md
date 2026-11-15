---
description: "Read when installing, regenerating or updating external Skills and runtime projections."
---

# Rulesync

[Rulesync](https://rulesync.dyoshikawa.com/) provides reusable Agent Skill dependencies and projections for selected agent runtimes. [rulesync.jsonc](../../rulesync.jsonc) is the **canonical selection and target configuration**; the Skills themselves remain upstream-owned. The template does not keep a second inventory of selected Skill names in documentation.

## First setup

After reviewing the source and requested targets and authorizing remote downloads and project writes, use `mise run agents-setup` to run the native dependency install, projection generation and generated ignore maintenance. Inspect and commit the resulting `rulesync.lock` and intended ignore changes.

Reinstall a previously established revision with `rulesync install --frozen` followed by `rulesync generate`. To deliberately move upstream Skill revisions, use `mise run agents-refresh`, inspect the lock/diff and then commit the intended update. `mise run agents-check` performs structural doctor/preview, not end-to-end runtime behavior evaluation.

This starter has no initial `rulesync.lock`; inspect and commit it after the first authorized installation. Runtime activation requires a separate [harness check](../development/agents/harness.md).

Do not edit generated projections; maintain asset selection and ownership through the [asset lifecycle](../development/agents/assets.md).

## Version management — strict

Track the CLI's major line as defined by the [tool policy](README.md#version-management). Review generator and schema changes within that line: run `mise run agents-check`, inspect projection and ignore-file diffs, and verify relevant runtimes.

Upgrading the CLI does not update upstream Skill revisions; those are resolved separately in `rulesync.lock`.
