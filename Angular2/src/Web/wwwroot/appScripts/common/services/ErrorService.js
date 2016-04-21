var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var core_2 = require('angular2/core');
var router_1 = require('angular2/router');
var ErrorInfo_1 = require('../../domain/ErrorInfo');
var LogService_1 = require('./LogService');
var ErrorService = (function () {
    function ErrorService(router, logService) {
        this.router = router;
        this.logService = logService;
        this.router = router;
        this.logService = logService;
        this.errorOccured$ = new core_2.EventEmitter();
    }
    ErrorService.prototype.logError = function (errInfo) {
        this.errorOccured$.emit(errInfo);
    };
    ErrorService.prototype.handleHttpError = function (error) {
        if (error.status === 401) {
            this.router.navigate(['Login']);
        }
        else {
            this.logService.log(JSON.stringify(error));
            this.logError(new ErrorInfo_1.ErrorInfo(JSON.stringify(error)));
        }
    };
    ErrorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, LogService_1.LogService])
    ], ErrorService);
    return ErrorService;
})();
exports.ErrorService = ErrorService;
//# sourceMappingURL=ErrorService.js.map