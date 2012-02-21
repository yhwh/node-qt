# Qt bindings for Node.js

_This is an experimental project._


## Creating new bindings

#### New class/files

1. Create your files (e.g. qclass.h, qclass.cc) from the provided templates template.h, template.cc
2. qclass.*: Search and replace all occurrences of `__Template__`, `__TEMPLATE__`, and `__template__` by the corresponding class name
3. wscript: Add qclass.cc to file list
4. qt.cc: Include qclass.h
5. qt.cc: Add QClass::Initialize() to Initialize()


#### New method in existing file

1. qclass.h: Declare static method as per `Example()` method in template.h
2. qclass.cc: Implement method as per `Example()` in template.cc
3. qclass.cc: Expose method to JavaScript via `tpl->PrototypeTemplate()` call in `Initialize()`. Again see template.cc



## Common errors

This is a list of common errors when loading a Node module, and their possible
solutions:


**Out of memory**

`name` in `NODE_MODULE(name, ...)` does not match target name?


**Unable to load shared library**

`(v8 object)->Set()` called to register a method, but method implementation 
is missing?


**Segmentation fault**

Did you forget to `new` a wrapped object? Otherwise, good luck!
