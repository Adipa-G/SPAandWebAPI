
Error.stackTraceLimit = 0;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

var builtPaths = (__karma__.config.builtPaths || ['wwwroot/app/'])
                 .map(function(p) { return '/base/'+p;});

__karma__.loaded = function () { };

function isJsFile(path) {
  return path.slice(-3) == '.js';
}

function isSpecFile(path) {
  return /\.spec\.(.*\.)?js$/.test(path);
}

function isBuiltFile(path) {
  return isJsFile(path) &&
         builtPaths.reduce(function(keep, bp) {
           return keep || (path.substr(0, bp.length) === bp);
         }, false);
}

var allSpecFiles = Object.keys(window.__karma__.files)
  .filter(isSpecFile)
  .filter(isBuiltFile);

System.config({
  baseURL: 'base',

  map: {
    '@angular/core/testing': 'wwwroot/lib/@angular/core/bundles/core-testing.umd.js',
    '@angular/http/testing': 'wwwroot/lib/@angular/http/bundles/http-testing.umd.js',
    '@angular/common/testing': 'wwwroot/lib/@angular/common/bundles/common-testing.umd.js',
    '@angular/compiler/testing': 'wwwroot/lib/@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser/testing': 'wwwroot/lib/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic/testing': 'wwwroot/lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
  },
});

System.import('src/systemjs.test.config.js')
  .then(initTestBed)
  .then(initTesting);

function initTestBed() {
    return Promise.all([
            System.import('@angular/core/testing'),
            System.import('@angular/platform-browser-dynamic/testing')
        ])
        .then(function(providers) {
            var coreTesting = providers[0];
            var browserTesting = providers[1];

            coreTesting.TestBed.initTestEnvironment(
                browserTesting.BrowserDynamicTestingModule,
                browserTesting.platformBrowserDynamicTesting());
        });
}

function initTesting () {
  return Promise.all(
    allSpecFiles.map(function (moduleName) {
      return System.import(moduleName);
    })
  )
  .then(__karma__.start, __karma__.error);
}
