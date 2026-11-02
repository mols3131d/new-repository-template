# Shared Development Tooling

This template provisions general repository maintenance tools without choosing an application language or framework. The exact CLI versions and executable task definitions are owned by [`mise.toml`](../../mise.toml); tool-specific formatting policies belong to [`.rumdl.toml`](../../.rumdl.toml), [`biome.json`](../../biome.json), and [`lefthook.yml`](../../lefthook.yml).

## Included tools

| Tool | General responsibility | Integration |
| --- | --- | --- |
| [mise](https://mise.jdx.dev/) | Tool versions and project tasks | Host prerequisite; not installed by this repository |
| [rumdl](https://rumdl.dev/) | Markdown lint and format | `mise run check`, `mise run format` |
| [Biome](https://biomejs.dev/) | JSON, JSONC, JavaScript and TypeScript lint/format | `mise run check`, `mise run format` |
| [Lefthook](https://lefthook.dev/) | Optional staged-file Git checks | `lefthook validate`; explicit `lefthook install` |
| [Rulesync](https://rulesync.dyoshikawa.com/) | Manage upstream Agent Asset selection and projections | `agents-setup`, `agents-check`, `agents-refresh` |

Node.js is present only to run npm-distributed CLI tools, not to decide the derived application's stack. The template does not install Python, uv, Ruff, pytest, shellcheck, actionlint, or release tooling because those need a real project to justify and configure them.

## Local use

After reviewing [`mise.toml`](../../mise.toml) and approving writes to mise-managed tool/cache locations:

```sh
mise install
mise run check
```

For intentional repository-wide formatting, run `mise run format`; this **writes** to tracked and untracked eligible files, so inspect the diff afterwards. When only a few files should change, prefer native scoped commands such as `rumdl fmt README.md docs/` or `biome format --write rulesync.jsonc biome.json` instead of whole-repository formatting.

`mise run check` is read-only with respect to project files and checks formatting/lint plus the Lefthook configuration; it is **not** an application build, test suite, CI gate, or proof that any Agent Skill loaded. `mise run agents-check` separately validates Rulesync configuration and previews its output. Actual application commands belong in [Development Reference](README.md).

### Optional Git hooks

The [Lefthook configuration](../../lefthook.yml) runs rumdl on staged Markdown and Biome on staged supported files, without automatically formatting or staging. The default setup does **not** call `lefthook install`. Before opting in, inspect existing hooks and `git config --get core.hooksPath` to avoid replacing custom/shared hook behavior. Run `lefthook install` only after that review and authorization. Git hooks are local conveniences, not a replacement for repository checks or PR review.

### Update and reproducibility

The CLI requests in `mise.toml` are exact pins. Updating them is an explicit change: review the upstream release, adjust a pin and any related configuration schema, and re-run checks and compare formatter output. The `rulesync.jsonc` Skill dependency ref/lock lifecycle is separate; see [Initial Agent Assets](agent-assets.md).

This PR does not contain a generated `mise.lock` or `rulesync.lock`. A derived repository should generate and review those with the real toolchain before claiming locked cross-platform reproducibility, and commit the intended lockfiles. Static configuration review is not installation validation.
