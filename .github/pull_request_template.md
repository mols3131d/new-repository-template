<!--
Keep Summary, Goal, Tasks, Checklist, and Boundaries as the five required H2 sections, in order.
Split a long H2 into descriptive H3 subsections when distinct topics or workstreams make it easier to scan; otherwise omit H3. Keep the three fixed Checklist H3 groups.
Remove unused optional sections, empty headings, placeholders, and authoring comments before submitting.
-->

## Summary

<!-- Summarize the outcome; link a related Issue or task when one exists. -->

## Goal

<!-- State the problem, intended outcome, and success criteria. Avoid repeating the Tasks list. -->

## Tasks

<!-- Track concrete deliverables using - [ ] and - [x]. Check only completed work. Group longer task lists under descriptive H3 headings when helpful; do not duplicate the changed-files list or commit history. -->

## Checklist

<!-- Keep the fixed checks below. Check only a criterion that was actually satisfied. Keep failed, pending, or unverified checks unchecked and explain why. For an inapplicable check, replace its entire checkbox item with a plain Markdown bullet in the form `- N/A: <reason>` (for example, `- N/A: no runtime behavior to verify`); do not use any checkbox syntax for N/A because it affects GitHub task progress. Add relevant checks as needed without copying CI logs. -->

### Self-review

<!-- Self-review applies to a specific PR HEAD, not just the first review. After a complete review, add a plain bullet `- Reviewed HEAD: <full commit SHA>` below these checks. After every push, uncheck the Self-review items, compare the last reviewed HEAD to the new HEAD, and review that delta in the context of the full PR diff, Goal, and Boundaries. Recheck only after reviewing the current HEAD and update the SHA. If the previous SHA cannot be compared, the base changed, or no previous review exists, review the entire current PR diff. A stale reviewed SHA does not count as completed self-review. -->

- [ ] Confirmed the Goal and Boundaries against the current PR diff.
- [ ] Reviewed new changes since the last reviewed HEAD (or the full diff on initial review) for unintended changes and regressions.

### Automated checks

- [ ] Applicable formatting and lint checks passed.
- [ ] Applicable automated tests passed.
- [ ] Applicable GitHub CI checks passed.

### Verification

- [ ] Task-specific acceptance criteria and runtime/manual behavior verified where applicable.
- [ ] Recorded failed, skipped, or unverified checks and unresolved risks (or confirmed none).

## Boundaries

<!-- Describe deliberate exclusions, material constraints, permissions, side effects, or follow-up work; use N/A when none apply. -->

<!-- Optional: add useful H2 sections such as Risks, Review Focus, Compatibility, Migration, Security, Handoff, or References. Omit empty sections. Add descriptive H3 subsections only when they improve readability. -->
