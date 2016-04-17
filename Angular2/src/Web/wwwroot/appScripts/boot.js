///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
var LogService_1 = require('./common/services/LogService');
var Constants_1 = require('./common/services/Constants');
var StorageService_1 = require('./common/services/StorageService');
var HttpClient_1 = require('./common/services/HttpClient');
var app_1 = require('./app');
browser_1.bootstrap(app_1.AppComponent, [
    http_1.HTTP_BINDINGS,
    http_1.HTTP_PROVIDERS,
    Constants_1.Constants,
    LogService_1.LogService,
    StorageService_1.StorageService,
    HttpClient_1.HttpClient
]);
//# sourceMappingURL=boot.js.map