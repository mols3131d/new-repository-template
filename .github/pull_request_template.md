(*Keep Description, Goal, Tasks, Checklist, and Boundaries as the five required H2 sections, in order. Split a long H2 into descriptive H3 subsections when distinct topics or workstreams make it easier to scan; otherwise omit H3. Keep the two fixed Checklist H3 groups. Keep the optional Documentation H3 only when relevant. Remove unused optional sections, empty headings, placeholders, and writing guidance before submitting.*)

## Description

(*Describe what changed and the resulting outcome; leave the problem and success criteria to Goal. Link related work when useful.*)

## Goal

(*State the problem, intended outcome, and success criteria. Avoid repeating the Tasks list.*)

## Tasks

(*Track concrete deliverables using - [ ] and - [x]. Check only completed work. Group longer task lists under descriptive H3 headings when helpful; do not duplicate the changed-files list or commit history.*)

## Checklist

(*Keep the fixed checks below. Check only a criterion that was actually satisfied. Keep failed, pending, or unverified checks unchecked and explain why. For an inapplicable check, replace its entire checkbox item with a plain Markdown bullet in the form `- N/A: <reason>` (for example, `- N/A: no runtime behavior to verify`); do not use any checkbox syntax for N/A because it affects GitHub task progress. Add relevant checks as needed without copying CI logs. Use plain bullets or paragraphs for free-form observations, rationale, exceptions and evidence, either immediately below Checklist (before its H3 groups) or under the relevant check. Explain material judgments and unmet checks with a reason, supporting evidence or a next action; omit routine commentary. Only checkboxes track completion.*)

### Self-review

- Reviewed HEAD: Pending

(*Review the full current PR diff on first review, when the previous reviewed SHA is unavailable, or when the base changes. Otherwise, review changes since the recorded SHA and their impact on the full PR diff, Goal, and Boundaries. After review, replace Pending with the full reviewed commit SHA.*)

> [!WARNING]
> Self-review is valid only for the recorded `Reviewed HEAD`. After every push, you must uncheck the Self-review items, review the changes, and update the checks and `Reviewed HEAD`.

- [ ] Confirmed the Goal and Boundaries against the current PR diff.
- [ ] Reviewed new changes since the last reviewed HEAD (or the full diff on initial review) for unintended changes and regressions.
- [ ] No blocking findings from self-review remain.

### Verification

(*State how applicable criteria were verified. When useful, add indented plain bullets under a check for method, environment, result, evidence or limitations. Link existing CI results instead of copying logs; do not claim a check passed without verification.*)

- [ ] Task-specific acceptance criteria and runtime/manual behavior verified where applicable.

### Documentation

(*Optional: keep this entire H3 only when documentation changes or is materially affected. Help humans and AI agents find and understand the information they need, make sound decisions, and act correctly. Reduce unnecessary context, navigation, reasoning, verification, and rework costs rather than minimizing length or token count for its own sake. Check only verified criteria and explain any unmet checks.*)

- [ ] **Purpose and audience:** The document has a clear role and intended audience, supporting the understanding, decisions, and actions they need.
- [ ] **Accuracy and completeness:** Facts, contracts, constraints, and evidence are preserved and aligned with the updated canonical sources.
- [ ] **Context and token cost:** Redundancy and verbosity are removed, and readers can load only the information they need.
- [ ] **Navigation cost:** Information locations, ownership, and relationships are clear, making canonical sources easy to find.
- [ ] **Reasoning cost:** Assumptions, conditions, relationships, and decision criteria are explicit, reducing unnecessary inference and rechecking.
- [ ] **Readability and maintainability:** Key information comes first, structure and wording are clear, and future changes do not require unnecessary duplicate maintenance.

## Boundaries

(*Record material exclusions, unverified work, unresolved risks, constraints, permissions, side effects, or follow-up work; use N/A when none apply.*)

(*Optional: add useful H2 sections such as Risks, Review Focus, Compatibility, Migration, Security, or Handoff. Omit empty sections.*)

## References

(*Optional: omit this entire H2 when there are no references. Keep only relevant H3 groups, in the order below. List each referenced item and its relationship as a plain bullet (`- `); add an indented child bullet only when the extra explanation is useful. Child bullets are always optional. Use closing keywords only for issues this PR actually resolves on merge. Remove unused headings, examples, and writing guidance before submitting.*)

### Resolves

(*Example: `Closes #...`; optional explanation of what this PR resolves.*)

### Dependencies

(*Example: `Depends on #...`; optional explanation of the prerequisite.*)

### Resources

(*Example: `Spec: URL`; optional explanation of the resource.*)

### Related

(*Example: `Refs #...`; optional explanation of the relationship.*)
