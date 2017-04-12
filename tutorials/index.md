---
layout: default
title: Trends Global Tutorials
---
#{{ page.title }}


- | Subject | Video Link | Video Length | Code Link | Code Format |
- |-------|--------|---------|-------|--------|

      {% for tutorial in site.tutorial %}
- <span>{{ post.date | date_to_string }}</span>| {{tutorial.title}} |
[{{tutorial.video.title}}]({{tutorial.video.url}})|{{TUTORIAL.video.length}} |
[{{tutorial.code.title}}]({{tutorial.code.url}})  |{{tutorial.code.format}}|
      {% endfor %}
