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
var ErrorInfo_1 = require('../../domain/ErrorInfo');
var ErrorService_1 = require('../services/ErrorService');
var ErrorComponent = (function () {
    function ErrorComponent(errorService) {
        var _this = this;
        this.errorService = errorService;
        errorService.errorOccured$.subscribe(function (error) { return _this.onError(error); });
        this.currentError = new ErrorInfo_1.ErrorInfo();
        this.currentError.message = '';
    }
    ErrorComponent.prototype.onError = function (error) {
        this.currentError = error;
    };
    ErrorComponent = __decorate([
        core_1.Component({
            selector: 'shared-error',
            viewProviders: [ErrorService_1.ErrorService],
            templateUrl: './templates/shared/components/ErrorComponent.html'
        }), 
        __metadata('design:paramtypes', [ErrorService_1.ErrorService])
    ], ErrorComponent);
    return ErrorComponent;
})();
exports.ErrorComponent = ErrorComponent;
//# sourceMappingURL=ErrorComponent.js.map