///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
var http_1 = require('angular2/http');
var browser_1 = require('angular2/platform/browser');
var LogService_1 = require('./common/services/LogService');
var Constants_1 = require('./common/services/Constants');
var app_1 = require('./app');
browser_1.bootstrap(app_1.AppComponent, [http_1.HTTP_BINDINGS, Constants_1.Constants, LogService_1.LogService]);
//# sourceMappingURL=boot.js.map