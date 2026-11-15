---
description: "Read when installing, regenerating or updating external Skills and runtime projections."
---

# Rulesync

[Rulesync](https://rulesync.dyoshikawa.com/) provides reusable Agent Skill dependencies and projections for selected agent runtimes. [rulesync.jsonc](../../rulesync.jsonc) is the **canonical selection and target configuration**; the Skills themselves remain upstream-owned. The template does not keep a second inventory of selected Skill names in documentation.

## First setup

This starter does not ship an initial `rulesync.lock`: the first authorized `mise run agents-setup` resolves the declared sources and writes the lock, curated files, runtime projections and managed ignore entries. Review the resolved refs, source selections, lock and `.gitignore` diff before committing them. Never hand-author a guessed lock.

On later runs, use `mise run agents-restore` to install with `--frozen`, regenerate projections and maintain ignore entries. A missing or incomplete lock must **fail visibly** instead of silently resolving new revisions. Plain `rulesync install` also reuses valid lock entries, but can resolve entries added or changed in the manifest; reserve `mise run agents-refresh` (`--update`) for an explicit upstream revision update. Inspect resulting lock and generated diffs before committing.

`mise run agents-check` performs structural doctor/preview, not an installation, locked restore or end-to-end runtime evaluation. Verify a representative target through [harness verification](../development/agents/harness.md).

Do not edit generated projections; maintain asset selection and ownership through the [asset lifecycle](../development/agents/assets.md).

## Version management — strict

Track the CLI's major line as defined by the [tool policy](README.md#version-management). Review generator and schema changes within that line: run `mise run agents-check`, inspect projection and ignore-file diffs, and verify relevant runtimes.

Upgrading the CLI does not update upstream Skill revisions; those are resolved separately in `rulesync.lock`.
