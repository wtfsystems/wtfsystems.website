---
layout: post
title:  C++, Templates, and a Game Engine
date:   2021-03-07
categories: cpp wtengine
---

Nothing like taking a deep breath and jumping right in.  I took on writing a game engine to become much more familiar with C++ and the STL, and I feel that I definitely have.

I started refactoring the engine into a format so I could try building it as a library.  Instead of keeping everything in a header I wanted to pre-compile the object files and link against it in a static archive.  Not that it took *that* long to build, but I wanted the experience of building a library.

Here's what I found out:
- Whats going with building the object files
- How exactly templates are being handled during the build process

[For information on the Entity Manager and how it works](https://www.wtfsystems.net/docs/wtengine/md__docs_ecs.html).

So in the Entity Manager, there's definitions that look like the following:
{% highlight c++ %}
template <typename T> const std::shared_ptr<T> set_component(const entity_id& e_id);
{% endhighlight %}

Basically function templates so that you can do typical get/sets on the components.  Or a bunch at once:

{% highlight c++ %}
template <typename T> const const_component_container<T> get_components(void) const;
{% endhighlight %}

When building the object file, it will need the definitions for every component type.  Sure the ones included in the engine could be defined, but if a custom component is created then it needs to be rebuilt.

I'm thinking my solution here may need to be that the Entity Manager is kept defined in the header, and compiled during the build.  Going to think about the structure here and what to do a bit more.

Also,
FIRST POST!