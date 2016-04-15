///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var LogService_1 = require('./common/services/LogService');
var Constants_1 = require('./common/services/Constants');
var ExRequestOptions_1 = require('./common/services/ExRequestOptions');
var app_1 = require('./app');
browser_1.bootstrap(app_1.AppComponent, [
    http_1.HTTP_BINDINGS,
    http_1.HTTP_PROVIDERS,
    Constants_1.Constants,
    LogService_1.LogService,
    core_1.provide(http_1.RequestOptions, { useClass: ExRequestOptions_1.ExRequestOptions })]);
//# sourceMappingURL=boot.js.map