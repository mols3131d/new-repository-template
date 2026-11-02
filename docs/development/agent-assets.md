# Initial Agent Assets

## Authority and lifecycle

The reusable Skill **selection** is maintained in [`rulesync.jsonc`](../../rulesync.jsonc). The source of the Skill bodies is the upstream repository at [`src/rulesync/.rulesync/skills/`](https://github.com/mols3131d/mols-agent-assets/tree/main/src/rulesync/.rulesync/skills); the Rulesync Skill comes from [Rulesync's own source](https://github.com/dyoshikawa/rulesync/tree/main/skills/rulesync). This consumer template does not fork those bodies into local authorship.

`rulesync install` downloads the selected Skills, including their packaged supporting files, into `.rulesync/skills/.curated/`; `rulesync generate` projects them to supported agent-native Skill locations. The generated `rulesync.lock` fixes resolved upstream revisions and integrity and **must be committed after the first successful setup**. Neither the selection list nor a generated projection alone proves that an agent actually discovered and followed a Skill.

## Starter selection

| Role | Skills |
| --- | --- |
| Initial setup and tool/agent harness | `mols-agent-asset-find`, `mols-chatbot-bootstrap`, `mols-dev-env-bootstrap-design`, `mols-ci-design`, `rulesync` |
| General software development | `coding-context`, `github-context`, `mols-test-design`, `mols-loops`, `mols-agent-asset` |
| Review, dependencies, code investigation | `review-changes`, `check-dependencies`, `code-flow-map`, `artifact-consistency-inspector` |
| Targeted code clarity and runtime explanation | `mols-clarify-code`, `mols-clarify-runtime`, `mols-code-comprehension-refactor` |
| Documentation and research | `mols-documentation`, `mols-markdown-maintenance`, `technical-document-fidelity`, `mols-mermaid-diagram`, `searcher` |

These are **available capabilities**, not a mandate to load all 22 Skills into every task. Use the relevant Skill's own activation and scope instructions. For example, `mols-ci-design` designs CI rather than silently installing workflows, and `mols-dev-env-bootstrap-design` assesses a bootstrap rather than provisioning a host on its own.

The template intentionally leaves out language-specific additions (such as Python and Tach), user-style helpers, Notion-dependent behavior, agent autonomy, prompt/evaluation specialization, and dialectic subagent suites. `coding-context` is selected instead of its overlapping `mols-coding-context` counterpart. Add conditional capabilities only when the derived project actually needs them. External reusable rules are not declared because the selected source does not expose a generic `src/rulesync/.rulesync/rules/` baseline. Add repository-specific rules through an appropriate canonical source rather than making up selectors.

## Setup and repeatability

1. Install [mise](https://mise.jdx.dev/) after inspecting its normal host/tool installation effects.
2. Run `mise install` then `mise run agents-setup` from the derived repository. This invokes native `rulesync install`, `rulesync generate`, and `rulesync gitignore` for the declared Skill targets.
3. Inspect the resolved files, generated ignore rules, and newly created `rulesync.lock`. Commit the lock and intended ignore changes.
4. For a repeatable reinstall from that lock, use `rulesync install --frozen` followed by `rulesync generate`. For a deliberate update, run `mise run agents-refresh`, review the lock and output changes, then commit.

`mise run agents-check` runs Rulesync's strict configuration doctor and a generation preview. It does **not** validate actual end-to-end runtime activation. Check Skill discovery in the target runtime with a representative relevant task. For a project using fewer agent runtimes, narrow `targets` in `rulesync.jsonc` and regenerate, rather than retaining unnecessary projections.

First setup needs external network access and may write to project-local state and tool-manager caches; it must be user-authorized. This template PR cannot generate a verified lock or assert an actual install in the current GitHub-only execution environment. Until the lock is generated and committed, dependency resolution remains incomplete; do not use `--frozen` or claim a reproducible deployment.

## Ownership boundaries

- **This template** owns which Skills are included and the lightweight bootstrap tooling.
- **Upstream** owns reusable Skill behavior and supporting files.
- **The derived repository** owns its application-specific instructions, toolchain, code, architecture, and tests.
- Generated vendor projections and curated dependencies are outputs of Rulesync, not canonical sources to edit by hand.

Official commands and update semantics: [Rulesync declarative sources](https://rulesync.dyoshikawa.com/guide/declarative-sources.html).
