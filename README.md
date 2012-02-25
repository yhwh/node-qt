# Node-Qt

Node-Qt provides native bindings to the [Qt library](http://developer.qt.nokia.com/doc/qt-4.8/) as a [Node.js addon](http://nodejs.org/docs/latest/api/addons.html). It was initially created as part of the [Calango](http://github.com/arturadib/calango) project which binds mostly to low-level `QtGui` primitives, but bindings to other parts of Qt are welcome.

There is no documentation for available bindings at the moment. We do try to follow [Qt's API](http://developer.qt.nokia.com/doc/qt-4.8/) as closely as possible, but sometimes quirks are inevitable. See the header files in `src/` for a list of available bindings, and comments in `.cc` files for possible API differences.

Supported platforms:

+ **Mac OS X**
+ **Linux**


#### Hello world

```javascript
var qt = require('node-qt'),
    app = new qt.QApplication,
    window = new qt.QWidget;

// Prevent objects from being GC'd
global.app = app;
global.window = window;

window.paintEvent(function() {
  var p = new qt.QPainter();
  p.begin(window);
  p.drawText(20, 30, 'hello node, hello qt');
  p.end();
});

window.resize(300, 150);
window.show();

// Join Node's event loop
setInterval(app.processEvents, 0);
```

For more, see `examples/` or the [Calango](http://github.com/arturadib/calango) project.







# Building


## Mac

There is no need to install Qt - the necessary binaries are bundled in `deps/`. Since node-gyp is used for building addons, you will need its dependencies (Python, Make, and GCC).

From the node-qt project dir, run:

```
$ node make
```

This will install node-gyp in your project directory via npm (if it's not installed globally already), configure, and build all the remaining binaries.


## Linux

You will need to install Qt and pkg-config. For example, on Ubuntu:

```
$ sudo apt-get install pkg-config qt-sdk
$ node make
```

The `node make` command will install node-gyp in your project directory via npm (if it's not installed globally already), configure, and build all the remaining binaries. (If you are getting Gtk console warnings when running Node-Qt scripts, try `sudo apt-get install gtk2-engines-pixbuf`).







# Running scripts

If the build was successful, you should be able to run scripts as usual, for example:

```
$ node examples/helloworld.js
```

To run scripts from outside the Node-Qt directory, simply `require()` the relative/absolute path to the `node-qt` directory, or move/symlink the `node-qt` folder into your project's `node_modules/`.






# Contributing

Please provide a test case for every new binding added. See `test/` for examples of unit tests.

#### Binding to new classes

1. Create your files (e.g. `qclass.h`, `qclass.cc`) from the provided templates `src/template.h`, `src/template.cc`
2. `qclass.*`: search and replace all occurrences of `__Template__`, `__TEMPLATE__`, and `__template__` with the corresponding class name
3. `node-qt.gyp`: Add qclass.cc to sources list
4. `qt.cc`: Include `qclass.h`
5. `qt.cc`: Add `QClass::Initialize()` to `Initialize()`


#### Binding to new methods

1. `qclass.h`: Declare static method as per `Example()` method in `template.h`
2. `qclass.cc`: Implement method as per `Example()` in `template.cc`
3. `qclass.cc`: Expose method to JavaScript via `tpl->PrototypeTemplate()` call in `Initialize()`. Again see template.cc.

#### Common errors

This is a list of common errors when experimenting with Node addons, and their possible solutions:

_"Out of memory"_

`name` in `NODE_MODULE(name, ...)` does not match target name?

_"Unable to load shared library"_

`(v8 object)->Set()` called to register a method, but method implementation 
is missing?

_"Segmentation fault"_

Tough luck :) Did you forget to `new` a wrapped object?
