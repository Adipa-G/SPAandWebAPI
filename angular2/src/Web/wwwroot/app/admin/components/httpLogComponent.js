System.register(["@angular/core", "../../domain/admin/HttpLogFilter", "../../common/services/ErrorService", "../../common/services/UtilsService", "../services/ServerLogService"], function (exports_1, context_1) {
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
    var core_1, HttpLogFilter_1, ErrorService_1, UtilsService_1, ServerLogService_1, HttpLogComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (HttpLogFilter_1_1) {
                HttpLogFilter_1 = HttpLogFilter_1_1;
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
            HttpLogComponent = (function () {
                function HttpLogComponent(errorService, serverLogService, utilsService) {
                    this.errorService = errorService;
                    this.serverLogService = serverLogService;
                    this.utilsService = utilsService;
                    this.errorService = errorService;
                    this.serverLogService = serverLogService;
                    this.utilsService = utilsService;
                    this.logLevels = [];
                    this.httpLogs = [];
                    this.totalCount = 0;
                    this.filter = this.initFilter();
                    this.initializeView();
                }
                HttpLogComponent.prototype.initializeView = function () {
                    var _this = this;
                    this.serverLogService.getLogLevels().subscribe(function (data) {
                        _this.logLevels = data;
                    }, function (err) {
                        _this.errorMessage = JSON.stringify(err);
                        _this.errorService.handleHttpError(err);
                    });
                    this.updateView(this.filter);
                };
                HttpLogComponent.prototype.updateView = function (httpLogFilter) {
                    var _this = this;
                    this.filter = httpLogFilter;
                    this.filter.fromDate = this.utilsService.dateToUtcServerFormat(this.filter.fromDateLocal);
                    this.filter.toDate = this.utilsService.dateToUtcServerFormat(this.filter.toDateLocal);
                    this.serverLogService.getLogHttp(this.filter).subscribe(function (data) {
                        _this.httpLogs = data.results;
                        _this.totalCount = data.totalCount;
                    }, function (err) {
                        _this.errorMessage = JSON.stringify(err);
                        _this.errorService.handleHttpError(err);
                    });
                };
                HttpLogComponent.prototype.initFilter = function () {
                    var httpLogFilter = new HttpLogFilter_1.HttpLogFilter();
                    httpLogFilter.orderField = 'CalledOn';
                    httpLogFilter.orderDirection = 'Desc';
                    httpLogFilter.pageNumber = 1;
                    httpLogFilter.pageSize = 100;
                    httpLogFilter.logLevel = '';
                    httpLogFilter.trackId = '';
                    return httpLogFilter;
                };
                HttpLogComponent.prototype.toggleHeaders = function (log) {
                    log.showHeaders = !log.showHeaders;
                };
                return HttpLogComponent;
            }());
            HttpLogComponent = __decorate([
                core_1.Component({
                    selector: 'http-logs',
                    templateUrl: './app/admin/components/httpLogComponent.html'
                }),
                __metadata("design:paramtypes", [ErrorService_1.ErrorService,
                    ServerLogService_1.ServerLogService,
                    UtilsService_1.UtilsService])
            ], HttpLogComponent);
            exports_1("HttpLogComponent", HttpLogComponent);
        }
    };
});

//# sourceMappingURL=httpLogComponent.js.map
