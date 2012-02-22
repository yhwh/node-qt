#!/usr/bin/env node
require('./maker');

var node = external('node', {required:true});
var nodegyp = external('node-gyp', {required:true});
var root = pwd();

target.all = function() {
  target.build();
}

target.build = function() {
  cd(root);
  var bin = 'bin/';

  echo('_________________________________________________________________');
  echo('Building Qt bindings');

  // Configure
  echo();
  echo('Configuring...');
  if (nodegyp('configure').code !== 0)
    exit(1);
  
  // Build it
  echo();
  echo('Building...');
  if (nodegyp('build').code !== 0)
    exit(1);
  
  // Clean up
  echo();
  echo('Cleaning up...');
  rm('-rf '+bin);
  mkdir(bin);
  mv('out/Release/qt.node '+bin);
  nodegyp('clean');

  echo();
  echo('Build successful. Binaries installed in:');
  echo('   '+bin);
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
