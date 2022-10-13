---
layout: main
---

<div id="newsheader"><h2>Latest News</h2></div>

{% for post in site.posts %}
<div class="posttitle"><a href="{{ post.url }}">{{ post.title }}</a><div>
<div class="postexcerpt">{{ post.excerpt }}</div>
{% endfor %}