## Summary

{{ summary }}

{% if scope %}

## Scope

{% for item in scope %}

- {{ item }}
{% endfor %}
{% endif %}

## Findings

{% if findings %}
{% for finding in findings %}

### {{ finding.title }}

**Impact:** {{ finding.impact }}

**Required change:** {{ finding.required_change }}

{% if finding.evidence %}
**Evidence:** {{ finding.evidence }}
{% endif %}

{% endfor %}
{% elif has_inline_findings %}
See inline review comments for findings.
{% else %}
No actionable findings in the reviewed scope.
{% endif %}

## Verification

{% for check in verification %}

- {{ check }}
{% endfor %}

{% if remaining_risks %}

## Remaining Risks

{% for risk in remaining_risks %}

- {{ risk }}
{% endfor %}
{% endif %}

<!-- Review decision (comment/approve/request changes) belongs to GitHub. Include only evidence-backed claims. -->
<!-- Required when an agent substantially authored or rewrote the review. -->
{% if author %}

```yaml
author:
{% for identity in author %}
  - {{ identity }}
{% endfor %}
```

{% endif %}
