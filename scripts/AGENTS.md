# Scripts Agent Instructions

Scope: `scripts/**`. Follow the [root instructions](../AGENTS.md); these rules add only script-specific constraints.

- Prefer the repository's existing runtime, native CLIs and [shared tasks](../mise.toml). Add a project-owned script only when native commands cannot express the needed behavior.
- Preserve documented arguments, exit status, deterministic output and generated-file formats. Treat check and validation commands as read-only; never rewrite inputs when reporting a check.
- When changing a script, update the relevant tests, callers, generated-file verification and [script guidance](README.md). Keep configuration and dependency versions in their established owners.
- Validate with the available executable tests and type checks before claiming success. Distinguish static inspection from an actual runtime test.
