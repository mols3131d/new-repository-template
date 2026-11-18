<!--
Keep Summary, Goal, Tasks, Checklist, and Boundaries as the five required H2 sections, in order.
In Tasks, use the suggested H3 groups for preparation and implementation only when they track actual work; remove unused groups. Keep the three fixed Checklist H3 groups.
Remove unused optional sections, empty headings, placeholders, and authoring comments before submitting.
-->

## Summary

<!-- Summarize the outcome; link a related Issue or task when one exists. -->

## Goal

<!-- State the problem, intended outcome, and success criteria. Avoid repeating the Tasks list. -->

## Tasks

<!-- Track concrete work with - [ ] and - [x]; check only completed items. Adapt or remove example preparation tasks and unused H3 groups. Do not repeat Checklist verification, changed-file lists, or commit history. -->

### Context & Scope

- [ ] Identify relevant requirements, affected paths, and constraints.

### Work Planning

- [ ] Break down deliverables and determine the verification approach.

### Implementation

<!-- Add PR-specific implementation tasks as checkboxes; remove this H3 if not needed. -->

## Checklist

<!-- Keep the fixed checks below. Check only a criterion that was actually satisfied. Keep failed, pending, or unverified checks unchecked and explain why. For an inapplicable check, replace its entire checkbox item with a plain Markdown bullet in the form `- N/A: <reason>` (for example, `- N/A: no runtime behavior to verify`); do not use any checkbox syntax for N/A because it affects GitHub task progress. Add relevant checks as needed without copying CI logs. -->

### Self-review

- [ ] Confirmed the Goal and Boundaries against the actual diff.
- [ ] Reviewed the diff for unintended changes and regressions.

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
