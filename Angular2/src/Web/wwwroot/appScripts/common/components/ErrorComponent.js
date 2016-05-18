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
var core_1 = require('angular2/core');
var Rx_1 = require('rxjs/Rx');
var ErrorService_1 = require('../services/ErrorService');
var ErrorComponent = (function () {
    function ErrorComponent(errorService) {
        var _this = this;
        this.errorService = errorService;
        this.currentErrors = new Array();
        this.subscription = errorService.errorOccured$.subscribe(function (error) { return _this.onError(error); });
        var timer = Rx_1.Observable.timer(10000, 10000);
        timer.subscribe(function (t) { return _this.currentErrors.splice(_this.currentErrors.length - 1, 1); });
    }
    ErrorComponent.prototype.onError = function (error) {
        this.currentErrors.push(error);
    };
    ErrorComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ErrorComponent = __decorate([
        core_1.Component({
            selector: 'common-error',
            templateUrl: './templates/common/components/ErrorComponent.html'
        }), 
        __metadata('design:paramtypes', [ErrorService_1.ErrorService])
    ], ErrorComponent);
    return ErrorComponent;
}());
exports.ErrorComponent = ErrorComponent;
