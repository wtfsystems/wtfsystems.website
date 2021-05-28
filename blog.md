---
layout: blog
---

<h2>Welcome to my Blog!</h2>

<ul>
    {% for post in site.posts %}
    <hr/>
    <li>
        <h3 class="titleformat"><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <span class="dateformat">{{ post.date | date_to_string }}</span>
        {{ post.excerpt }}
    </li>
    {% endfor %}
</ul>