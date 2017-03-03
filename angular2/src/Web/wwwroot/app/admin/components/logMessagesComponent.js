System.register(["@angular/core", "../../domain/admin/LogMessageFilter", "../../common/services/ErrorService", "../../common/services/UtilsService", "../services/ServerLogService"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, LogMessageFilter_1, ErrorService_1, UtilsService_1, ServerLogService_1, LogMessagesComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (LogMessageFilter_1_1) {
                LogMessageFilter_1 = LogMessageFilter_1_1;
            },
            function (ErrorService_1_1) {
                ErrorService_1 = ErrorService_1_1;
            },
            function (UtilsService_1_1) {
                UtilsService_1 = UtilsService_1_1;
            },
            function (ServerLogService_1_1) {
                ServerLogService_1 = ServerLogService_1_1;
            }
        ],
        execute: function () {
            LogMessagesComponent = (function () {
                function LogMessagesComponent(errorService, serverLogService, utilsService) {
                    this.errorService = errorService;
                    this.serverLogService = serverLogService;
                    this.utilsService = utilsService;
                    this.errorService = errorService;
                    this.serverLogService = serverLogService;
                    this.utilsService = utilsService;
                    this.logLevels = [];
                    this.loggers = [];
                    this.logMessages = [];
                    this.totalCount = 0;
                    this.filter = this.initFilter();
                    this.initializeView();
                }
                LogMessagesComponent.prototype.initializeView = function () {
                    var _this = this;
                    this.serverLogService.getLogLevels().subscribe(function (data) {
                        _this.logLevels = data;
                    }, function (err) {
                        _this.errorMessage = JSON.stringify(err);
                        _this.errorService.handleHttpError(err);
                    });
                    this.serverLogService.getLoggers().subscribe(function (data) {
                        _this.loggers = data;
                    }, function (err) {
                        _this.errorMessage = JSON.stringify(err);
                        _this.errorService.handleHttpError(err);
                    });
                    this.updateView(this.filter);
                };
                LogMessagesComponent.prototype.updateView = function (logMessageFilter) {
                    var _this = this;
                    this.filter = logMessageFilter;
                    this.filter.fromDate = this.utilsService.dateToUtcServerFormat(this.filter.fromDateLocal);
                    this.filter.toDate = this.utilsService.dateToUtcServerFormat(this.filter.toDateLocal);
                    this.serverLogService.getLogMessages(this.filter).subscribe(function (data) {
                        _this.logMessages = data.results;
                        _this.totalCount = data.totalCount;
                    }, function (err) {
                        _this.errorMessage = JSON.stringify(err);
                        _this.errorService.handleHttpError(err);
                    });
                };
                LogMessagesComponent.prototype.initFilter = function () {
                    var logMessageFilter = new LogMessageFilter_1.LogMessageFilter();
                    logMessageFilter.orderField = 'LogTimestamp';
                    logMessageFilter.orderDirection = 'Desc';
                    logMessageFilter.pageNumber = 1;
                    logMessageFilter.pageSize = 100;
                    logMessageFilter.logLevel = '';
                    logMessageFilter.logger = '';
                    return logMessageFilter;
                };
                return LogMessagesComponent;
            }());
            LogMessagesComponent = __decorate([
                core_1.Component({
                    selector: 'log-messages',
                    templateUrl: './app/admin/components/logMessagesComponent.html'
                }),
                __metadata("design:paramtypes", [ErrorService_1.ErrorService,
                    ServerLogService_1.ServerLogService,
                    UtilsService_1.UtilsService])
            ], LogMessagesComponent);
            exports_1("LogMessagesComponent", LogMessagesComponent);
        }
    };
});

//# sourceMappingURL=logMessagesComponent.js.map
