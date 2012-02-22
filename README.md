# Node-Qt

Node-Qt provides native C++ bindings to the [Qt library](http://developer.qt.nokia.com/doc/qt-4.8/) as a [Node.js addon](http://nodejs.org/docs/latest/api/addons.html). It is being developed primarily to support the [Calango](http://github.com/arturadib/calango) project (low-level HTML5 APIs for Node.js), so most of the implemented bindings concern graphics, audio, and input primitives from the `QtGui` module.

Contributions towards other parts of Qt are welcome.





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

You will need to install Node's addon build tool [node-gyp](https://github.com/TooTallNate/node-gyp). From the node-qt project dir, run:

```
$ npm install -g node-gyp
$ ./make.js
```

and cross your fingers. (Currently only Mac OS X is supported, but with minor work other platforms can be added).

There is no need to install Qt - the necessary binaries are bundled in `deps/`.






## Contributing

#### Creating new classes

1. Create your files (e.g. `qclass.h`, `qclass.cc`) from the provided templates `src/template.h`, `src/template.cc`
2. `qclass.*`: search and replace all occurrences of `__Template__`, `__TEMPLATE__`, and `__template__` with the corresponding class name
3. `node-qt.gyp`: Add qclass.cc to sources list
4. `qt.cc`: Include `qclass.h`
5. `qt.cc`: Add `QClass::Initialize()` to `Initialize()`


#### Creating new methods

1. `qclass.h`: Declare static method as per `Example()` method in `template.h`
2. `qclass.cc`: Implement method as per `Example()` in `template.cc`
3. `qclass.cc`: Expose method to JavaScript via `tpl->PrototypeTemplate()` call in `Initialize()`. Again see template.cc.

#### Common errors

This is a list of common errors when experimenting with Node addons, and their possible solutions:

**Out of memory**

`name` in `NODE_MODULE(name, ...)` does not match target name?

**Unable to load shared library**

`(v8 object)->Set()` called to register a method, but method implementation 
is missing?

**Segmentation fault**

Tough luck :) Did you forget to `new` a wrapped object?
