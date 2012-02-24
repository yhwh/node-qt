#!/usr/bin/env node
require('./maker');

var node = external('node', {required:true}),
    root = pwd();

target.all = function() {
  target.build();
}

target.build = function() {
  cd(root);
  var bin = 'bin/';

  echo('_________________________________________________________________');
  echo('Building Node-Qt');
  echo();

  var nodegyp = external('./node_modules/.bin/node-gyp', {required:false}) || external('node-gyp', {required:false});

  if (!nodegyp) {
    var npm = external('npm', {required:true});
    
    echo('Installing node-gyp it in the current dir...');
    var npmResult = npm('install node-gyp', {silent:true});
    if (npmResult.code !== 0) {
      echo('Could not install node-gyp using npm:');
      echo();
      echo(npmResult.output);
      exit(1);
    }
    
    nodegyp = external('./node_modules/.bin/node-gyp', {required:true});
  }

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
  echo('Node-Qt build successful. You can run the unit tests with:');
  echo('   $ node make test');
}

target.test = function() {
  cd(root);
  
  echo('_________________________________________________________________');
  echo('Running Node-Qt tests');
  echo();
  
  cd('test');
  rm('-f img-test/*');
  for (f in ls('*.js')) {
    echo('Running test file '+f);
    node(f);
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

target.clean = function() {
  cd(root);

  var nodegyp = external('./node_modules/.bin/node-gyp', {required:false}) || external('node-gyp', {required:false});
  if (nodegyp)
    nodegyp('clean');
}
