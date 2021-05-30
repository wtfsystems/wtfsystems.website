---
layout: post
title:  Refactored as a Library
date:   2021-03-21
categories: cpp wtengine
---

After some reading and tinkering I was able to get it to build!  So here's what I ended up going with:

- Anything with a template (entity mgr, flags, variables) are kept implemented in headers.
- All other objects (systems, components, other managers) are built and stored in an archive.

A pre-compile of anything templated would require instantiation for each object type.  Considering we don't know what custom components could be created, there's no way we can account for this during the library build step.

Essentially the parts in the archive are the 'building blocks' while the template headers are the 'glue' to hold it all together.  Currently I'm just using Bash scripts to tree-crawl the source folders and build.  I'm building a static archive as the idea is 'use these parts to construct a game'.

Now that I have this working, here's the current project goals:
- Code review / clean up comment headers (yay regex)
- Review the debugging modes and potentially improve for working as a library
- Create a working cmake script to build the library archive
- Get rid of the audio thread.  Easier to address music & samples.  Also what if we want to sync to the beat?
- Improve the input handling
- ???
- Profit!
