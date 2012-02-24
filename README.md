# Node-Qt

Node-Qt provides native C++ bindings to the [Qt library](http://developer.qt.nokia.com/doc/qt-4.8/) as a [Node.js addon](http://nodejs.org/docs/latest/api/addons.html). It was initially created as part of the [Calango](http://github.com/arturadib/calango) project (hence most bindings so far concern `QtGui` primitives), but contributions towards other parts of Qt are welcome.

At the moment, there is no documentation for available bindings. We do try to follow [Qt's API](http://developer.qt.nokia.com/doc/qt-4.8/) as closely as possible, but sometimes quirks are inevitable. See the header files in `src/` for a list of available bindings, and comments in `.cc` files for possible API differences.



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






## Building

There is no need to install Qt - the necessary binaries are bundled in `deps/`. (Currently only Mac OS X is supported, but with minor work other platforms can be added). The dependencies are the same as Node's addon build tool [node-gyp](http://github.com/TooTallNate/node-gyp).

From the node-qt project dir, run:

```
$ node make
```

and cross your fingers. This will install node-gyp in your project directory via npm, if it's not installed globally already.

To run the unit tests:

```
$ node make test
```

Simple regression tests based on image differences are provided. Since different platforms generate different images based on several factors, it's likely these image-based regression tests will fail on your setup. Ignore those errors.







## Contributing

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
