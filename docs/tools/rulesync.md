---
description: "Read when installing, regenerating or updating external Skills and runtime projections."
---

# Rulesync

[Rulesync](https://rulesync.dyoshikawa.com/) provides reusable Agent Skill dependencies and projections for selected agent runtimes. [rulesync.jsonc](../../rulesync.jsonc) is the **canonical selection and target configuration**; the Skills themselves remain upstream-owned. The template does not keep a second inventory of selected Skill names in documentation.

## First setup

After reviewing the source and requested targets and authorizing remote downloads and project writes, use `mise run agents-setup` to run the native dependency install, projection generation and generated ignore maintenance. Inspect and commit the resulting `rulesync.lock` and intended ignore changes.

Reinstall a previously established revision with `rulesync install --frozen` followed by `rulesync generate`. To deliberately move upstream Skill revisions, use `mise run agents-refresh`, inspect the lock/diff and then commit the intended update. `mise run agents-check` performs structural doctor/preview, not end-to-end runtime behavior evaluation.

The manifest or lock does not prove that a target agent discovered a Skill. Inspect actual installation/projection and verify activation in a representative runtime before making that claim. The template ships no pre-resolved `rulesync.lock`; the first authorized installation must resolve, inspect and commit it before reproducibility can be claimed.

Keep the source upstream unless explicitly adopting ownership into this project. Do not hand-edit installed curated dependencies or generated vendor projections; if a derived project adds a locally maintained Skill, choose and document its own canonical source rather than copying the upstream body.

## Version management — strict

Use a **major prefix** for the Rulesync CLI in [`mise.toml`](../../mise.toml), allowing minor and patch updates within that major. Its generators, config schema and target support can change even within a major line. Apply strict review when updating: inspect upstream changes, run `mise run agents-check`, compare projection and ignore-file diffs, and verify representative target runtimes. The major prefix does not prove runtime compatibility.

The CLI version and Skill source revisions are independent. [`rulesync.jsonc`](../../rulesync.jsonc) declares upstream sources; the generated `rulesync.lock` records resolved Skill revisions after the first authorized install. Never treat an upgraded CLI as permission to silently refresh those sources.
