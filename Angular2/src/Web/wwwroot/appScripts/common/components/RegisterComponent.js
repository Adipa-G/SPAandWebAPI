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
var router_1 = require('angular2/router');
var Rx_1 = require('rxjs/Rx');
var RegistrationInfo_1 = require('../../domain/common/RegistrationInfo');
var RegisterService_1 = require('../services/RegisterService');
var ErrorService_1 = require('../../common/services/ErrorService');
var RegisterComponent = (function () {
    function RegisterComponent(router, errorService, registerService) {
        this.router = router;
        this.errorService = errorService;
        this.registerService = registerService;
        this.success = false;
        this.router = router;
        this.errorService = errorService;
        this.registerService = registerService;
        this.regInfo = new RegistrationInfo_1.RegistrationInfo();
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.registerService.register(this.regInfo).subscribe(function (data) {
            _this.success = true;
            var timer = Rx_1.Observable.timer(5000);
            timer.subscribe(function () { return _this.router.navigate(['Login']); });
        }, function (err) {
            _this.errorService.handleHttpError(err);
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'common-signup',
            viewProviders: [RegisterService_1.RegisterService],
            templateUrl: './templates/common/components/RegisterComponent.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, ErrorService_1.ErrorService, RegisterService_1.RegisterService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
