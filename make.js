#!/usr/bin/env node
require('./maker');

var node = external('node', {required:true});
var nodewaf = external('node-waf', {required:true});
var root = pwd();

target.all = function() {
  target.build();
}

target.build = function() {
  cd(root);

  echo('_________________________________________________________________');
  echo('Building Qt bindings');
  echo();

  cd('src');
  rm('-rf build');
  
  // Build it!
  if (!nodewaf('configure build'))
    exit(1);
  
  rm('-rf ../build')
  mv('build/ ..');
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
