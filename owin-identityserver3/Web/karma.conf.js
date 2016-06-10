module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
          './web/lib/jquery-2.2.4.js',
          './web/lib/bootstrap.js',
          './web/lib/vkbeautify.js',
          './web/lib/highlight.min.js',
          './web/lib/moment.js',
          './web/lib/angular.js',
          './web/lib/angular-route.js',
          './web/lib/angular-local-storage.js',
          './web/lib/loading-bar.js',
          './web/lib/ui-bootstrap-tpls-0.14.3.js',
          './web/lib/ngFormValidator.1.4.1.0.js',
          './web/app/app.js',
          '../Web.Test/web/lib/angular-mocks.js',
          '../Web.Test/web/app/spec_helper.js',
          '../Web.Test/web/app/templates.js',
          '../Web.Test/web/app/**/*Test.js'
        ],
        exclude: [
        ],
        preprocessors: {},
        reporters: ['dots'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        plugins : ['karma-jasmine', 'karma-phantomjs-launcher'],
        browsers: ['PhantomJS'],
        singleRun: false
    });
};