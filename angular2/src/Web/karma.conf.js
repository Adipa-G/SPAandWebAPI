module.exports = function (config) {
    var appBase = 'wwwroot/app/'; // transpiled app JS and map files
    var appSrcBase = 'src/app/'; // app source TS files
    var appAssets = '/base/wwwroot/app/';

    config.set({
        basePath: '',

        proxies: {
            "/app/": appAssets
        },
        
        frameworks: ['jasmine'],

        plugins: [
          require('karma-jasmine'),
          require('karma-chrome-launcher'),
          require('karma-jasmine-html-reporter')
        ],

        files: [
          'wwwroot/lib/systemjs/dist/system.src.js',

          // Polyfills
          'wwwroot/lib/core-js/client/shim.min.js',
          'wwwroot/lib/reflect-metadata/Reflect.js',

          // zone.js
          'wwwroot/lib/zone.js/dist/zone.js',
          'wwwroot/lib/zone.js/dist/long-stack-trace-zone.js',
          'wwwroot/lib/zone.js/dist/proxy.js',
          'wwwroot/lib/zone.js/dist/sync-test.js',
          'wwwroot/lib/zone.js/dist/jasmine-patch.js',
          'wwwroot/lib/zone.js/dist/async-test.js',
          'wwwroot/lib/zone.js/dist/fake-async-test.js',

          { pattern: 'wwwroot/lib/@angular/**/*.js', included: false, watched: false },
         
          { pattern: 'wwwroot/lib/rxjs/**/*.js', included: false, watched: false },

          { pattern: 'wwwroot/lib/moment/**/*.js', included: false, watched: false },

          { pattern: 'src/systemjs.test.config.js', included: false, watched: false },
          'karma-test-shim.js',

          { pattern: 'wwwroot/app/**/*.html', included: false, watched: true },
          { pattern: 'wwwroot/app/**/*.js', included: false, watched: true },
          { pattern: 'src/app/**/*.ts', included: false, watched: true },
          { pattern: 'wwwroot/app/**/*.js.map', included: false, watched: true }
        ],

        reporters: ['progress', 'kjhtml'],

        exclude: [],
        preprocessors: {},
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};

