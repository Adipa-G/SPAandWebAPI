module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
          './dist/lib/jquery-3.6.1.js',
          './dist/lib/bootstrap.js',
          './dist/lib/vkbeautify.js',
          './dist/lib/highlight.min.js',
          './dist/lib/moment.js',
          './dist/lib/angular.js',
          './dist/lib/angular-route.js',
          './dist/lib/angular-local-storage.js',
          './dist/lib/loading-bar.js',
          './dist/lib/ui-bootstrap-tpls-0.14.3.js',
          './dist/lib/ngFormValidator.1.4.1.0.js',
          './dist/app/app.js',
          './web-test/lib/angular-mocks.js',
          './web-test/app/spec_helper.js',
          './web-test/app/templates.js',
          './web-test/app/**/*Test.js'
        ],
        exclude: [
        ],
        preprocessors: {},
        reporters: ['dots'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        plugins : ['karma-chrome-launcher','karma-jasmine'],
        browsers: ['ChromeHeadless'],
        singleRun: false
    });
};