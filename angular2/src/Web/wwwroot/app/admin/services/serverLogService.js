System.register(["@angular/core", "rxjs/add/operator/map", "rxjs/add/operator/catch", "../../common/services/HttpClient", "../../common/services/Constants"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, HttpClient_1, Constants_1, ServerLogService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (HttpClient_1_1) {
                HttpClient_1 = HttpClient_1_1;
            },
            function (Constants_1_1) {
                Constants_1 = Constants_1_1;
            }
        ],
        execute: function () {
            ServerLogService = (function () {
                function ServerLogService(httpClient, constants) {
                    this.httpClient = httpClient;
                    this.constants = constants;
                }
                ServerLogService.prototype.getLogLevels = function () {
                    return this.httpClient
                        .get(this.constants.getServiceBaseUrl() + 'api/log/levels')
                        .map(function (res) { return res.json(); });
                };
                ;
                ServerLogService.prototype.getLoggers = function () {
                    return this.httpClient
                        .get(this.constants.getServiceBaseUrl() + 'api/log/loggers')
                        .map(function (res) { return res.json(); });
                };
                ;
                ServerLogService.prototype.getLogMessages = function (filter) {
                    return this.httpClient
                        .post(this.constants.getServiceBaseUrl() + 'api/log/logMessages', JSON.stringify(filter))
                        .map(function (res) { return res.json(); });
                };
                ;
                ServerLogService.prototype.getLogHttp = function (filter) {
                    return this.httpClient
                        .post(this.constants.getServiceBaseUrl() + 'api/log/logHttp', JSON.stringify(filter))
                        .map(function (res) { return res.json(); });
                };
                ;
                return ServerLogService;
            }());
            ServerLogService = __decorate([
                core_1.Injectable(),
                __param(0, core_1.Inject(HttpClient_1.HttpClient)),
                __param(1, core_1.Inject(Constants_1.Constants)),
                __metadata("design:paramtypes", [HttpClient_1.HttpClient,
                    Constants_1.Constants])
            ], ServerLogService);
            exports_1("ServerLogService", ServerLogService);
            ;
        }
    };
});

//# sourceMappingURL=serverLogService.js.map
