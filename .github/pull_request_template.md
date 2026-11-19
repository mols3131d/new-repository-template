<!--
Keep Summary, Goal, Tasks, Checklist, and Boundaries as the five required H2 sections, in order.
Split a long H2 into descriptive H3 subsections when distinct topics or workstreams make it easier to scan; otherwise omit H3. Keep the two fixed Checklist H3 groups.
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

- Reviewed HEAD: Pending

<!--
Review the full current PR diff on first review, when the previous reviewed SHA is unavailable,
or when the base changes. Otherwise, review changes since the recorded SHA and their
impact on the full PR diff, Goal, and Boundaries. After review, replace Pending with
the full reviewed commit SHA.
-->

> [!WARNING]
> Self-review is valid only for the recorded `Reviewed HEAD`. After every push, you must uncheck the Self-review items, review the changes, and update the checks and `Reviewed HEAD`.

- [ ] Confirmed the Goal and Boundaries against the current PR diff.
- [ ] Reviewed new changes since the last reviewed HEAD (or the full diff on initial review) for unintended changes and regressions.
- [ ] No blocking findings from self-review remain.

### Verification

- [ ] Task-specific acceptance criteria and runtime/manual behavior verified where applicable.

## Boundaries

<!-- Record material exclusions, unverified work, unresolved risks, constraints, permissions, side effects, or follow-up work; use N/A when none apply. -->

<!-- Optional: add useful H2 sections such as Risks, Review Focus, Compatibility, Migration, Security, Handoff, or References. Omit empty sections. Add descriptive H3 subsections only when they improve readability. -->
