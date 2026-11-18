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

<!-- Keep the fixed checks below. Check only when the criterion is satisfied. Leave failed, pending, or unverified checks unchecked and give a reason. Mark a check N/A only if genuinely inapplicable and explain why; N/A is not a passed execution. Add relevant checks as needed without copying CI logs. -->

### Self-review

- [ ] Confirmed the Goal and Boundaries against the actual diff.
- [ ] Reviewed the diff for unintended changes and regressions.

### Automated checks

- [ ] Applicable formatting and lint checks passed (or N/A with reason).
- [ ] Applicable automated tests and GitHub CI checks passed (or N/A with reason).

### Verification

- [ ] Task-specific acceptance criteria and runtime/manual behavior verified where applicable (or N/A with reason).
- [ ] Recorded failed, skipped, or unverified checks and unresolved risks (or confirmed none).

## Boundaries

<!-- Describe deliberate exclusions, material constraints, permissions, side effects, or follow-up work; use N/A when none apply. -->

<!-- Optional: add useful H2 sections such as Risks, Review Focus, Compatibility, Migration, Security, Handoff, or References. Omit empty sections. Add descriptive H3 subsections only when they improve readability. -->

<!-- Agent-authored PR: replace the placeholder with verified author identity; use unknown for any unverified component. Human-authored PR: delete the entire YAML block. Keep the completed block last. See templates/README.md. -->

```yaml
author:
  - <user>:<provider>:<product>[/<mode>]:<model>
```
