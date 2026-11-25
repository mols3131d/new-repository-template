(*GitHub already provides file and line context. One actionable finding per inline comment.*)

{{ finding }}

{% if impact %}
**Impact:** {{ impact }}
{% endif %}

{% if required_change %}
**Required change:** {{ required_change }}
{% endif %}

{% if evidence %}
**Evidence:** {{ evidence }}
{% endif %}

(*Required when an agent substantially authored or rewrote the inline comment.*)
{% if author %}

```yaml
author:
{% for identity in author %}
  - {{ identity }}
{% endfor %}
```

{% endif %}
