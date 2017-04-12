---
layout: default
title: Trends Global Tutorials
---
    <h1>{{ page.title }}</h1>
    <ul class="posts">

<li>| Subject | Video Link | Video Length | Code Link | Code Format |    </li>
<li>|-------|--------|---------|-------|--------|</li>


      {% for tutorial in site.tutorial %}
<li><span>{{ post.date | date_to_string }}</span>| {{tutorial.title}} |<a href="{{ tutorial.video.url }}" title="{{
  tutorial.video.title}}>"{{tutorial.video.title}}</a> | {{tutorial.video.length}}
  | <a href="{{tutorial.code.url}}" title ="{{tutorial.code.title}}">{{tutorial.code.title}}</a>|
   {{tutorial.code.format}}|</li>
      {% endfor %}
    </ul>
