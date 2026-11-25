(*Issue / PR conversation comment. State the conclusion first; omit empty sections and replace all notation before posting.*)

{{ message }}

{% if next_actions %}

## Next Actions

{% for action in next_actions %}

- [ ] {{ action }}
{% endfor %}
{% endif %}

{% if evidence %}

## Evidence

{% for item in evidence %}

- {{ item }}
{% endfor %}
{% endif %}

(*Required when an agent substantially authored or rewrote the comment.*)
{% if author %}

```yaml
author:
{% for identity in author %}
  - {{ identity }}
{% endfor %}
```

{% endif %}
