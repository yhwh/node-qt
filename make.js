#!/usr/bin/env node
require('./maker');

var node = external('node', {required:true});
var nodewaf = external('node-waf', {required:true});
var root = pwd();

target.all = function() {
  target.build();
}

//
// Qt bindings
//

// Try to find a pkg-config that knows about Qt at all costs
// (Some systems have multiple pkg-configs installed, e.g. MacPorts, Homebrew, etc)
function findValidPkgConfig() {
  var pkgconfig;
  
  pkgconfig = external('pkg-config', {silent:true}); // in PATH?
  if (pkgconfig && pkgconfig('--exists QtCore').code == 0)
    return pkgconfig; // found it!

  pkgconfig = external('/usr/local/bin/pkg-config', {silent:true});    
  if (pkgconfig && pkgconfig('--exists QtCore').code == 0)
    return pkgconfig;
      
  pkgconfig = external('/usr/bin/pkg-config', {silent:true});
  if (pkgconfig && pkgconfig('--exists QtCore').code == 0)
    return pkgconfig;

  pkgconfig = external('/opt/local/bin/pkg-config', {silent:true});
  if (pkgconfig && pkgconfig('--exists QtCore').code == 0)
    return pkgconfig;

  pkgconfig = external('/opt/bin/pkg-config', {silent:true});
  if (pkgconfig && pkgconfig('--exists QtCore').code == 0)
    return pkgconfig;

  echo();
  echo('Error: Could not find a pkg-config that knows about Qt. Is Qt properly installed?');
  echo();
  exit(1);
}

target.build = function() {
  cd(root);

  echo('_________________________________________________________________');
  echo('Building Qt bindings');
  echo();

  cd('src');
  echo('Looking for a pkg-config that works with Qt');
  var pkgconfig = findValidPkgConfig();
  
  echo('Getting Qt compiler options via pkg-config');
  var pkgOutput = pkgconfig('--libs --cflags QtCore QtGui QtTest').output;
  
  var match, regex,
      frameworkPath = [],
      framework = [],
      includes = [],
      libpath = [],
      lib = [];
  
  regex = /\-F([^\s]+)/g;
  while (match = regex.exec(pkgOutput))
    frameworkPath.push(match[1]);

  regex = /\-framework\s([^\s]+)/g;
  while (match = regex.exec(pkgOutput))
    framework.push(match[1]);

  regex = /\-I([^\s]+)/g;
  while (match = regex.exec(pkgOutput))
    includes.push(match[1]);

  regex = /\-L([^\s]+)/g;
  while (match = regex.exec(pkgOutput))
    libpath.push(match[1]);

  regex = /\-l([^\s]+)/g;
  while (match = regex.exec(pkgOutput))
    lib.push(match[1]);

  // Write wscript from template
  var template = read('wscript.template');
  template += '\n';
  template += includes.length>0 ? '  obj.includes = [\'' + includes.join('\',\'') + '\']\n' : '';
  template += frameworkPath.length>0 ? '  obj.frameworkpath = [\'' + frameworkPath + '\']\n' : '';
  template += framework.length>0 ? '  obj.framework = [\'' + framework.join('\',\'') + '\']\n' : '';
  template += libpath.length>0 ? '  obj.libpath = [\'' + libpath.join('\',\'') + '\']\n' : '';
  template += lib.length>0 ? '  obj.lib = [\'' + lib.join('\',\'') + '\']\n' : '';
  template.to('wscript');

  rm('-rf build');
  
  // Build it!
  if (!nodewaf('configure build'))
    exit(1);
  
  mv('build ..');
}

target.test = function() {
  cd(root);
  
  echo('_________________________________________________________________');
  echo('Running Qt binding tests');
  echo();
  
  cd('test');
  rm('-f img-test/*');
  for (f in ls('*.js')) {
    echo('Running test file '+f);
    node('--harmony_typeof --harmony_proxies --harmony_weakmaps --harmony_block_scoping '+f);
  }
}

target.ref = function() {
  cd(root);

  cd('test');
  echo('_________________________________________________________________');
  echo('Qt tests: Overwriting reference images with most recent test output');
  rm('-f img-ref/*');
  mv('img-test/* img-ref');
}
