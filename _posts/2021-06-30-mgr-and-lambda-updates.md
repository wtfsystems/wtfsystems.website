---
layout: post
title:  Manager and Lambda Updates to the Engine
date:   2021-06-30
categories: wtengine c++
---

First off, dropped the threading on the audio manager.  There's an issue with the message processing that needs addressing, but now audio commands can be called via code.

Also, all managers are now fully static to allow global addressing.  Anything that should be internal ( __needs review ;p__ ) to the engine only is marked as private now in the managers.  To get around this, an interface class is added.  The managers are marked as friends of the manager, then the internal engine class calls this.

Now that the managers are static, the component lambdas have been cleaned up so the managers arn't passed everywhere by reference anymore.  And got captures working!  The lambdas were being passed in by function *pointer* and stored in a *wrapper*.  Updating to the STL std::function wrappers fixed that.