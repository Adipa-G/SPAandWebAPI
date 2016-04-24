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
var core_2 = require('angular2/core');
var http_1 = require('angular2/http');
var ErrorInfo_1 = require('../../domain/ErrorInfo');
var AuthenticationDetails_1 = require('../../domain/auth/AuthenticationDetails');
var Constants_1 = require('./Constants');
var LogService_1 = require('./LogService');
var ErrorService_1 = require('./ErrorService');
var StorageService_1 = require('./StorageService');
var AuthService = (function () {
    function AuthService(http, constants, logService, errorService, storageService) {
        this.http = http;
        this.constants = constants;
        this.logService = logService;
        this.errorService = errorService;
        this.storageService = storageService;
        this.http = http;
        this.constants = constants;
        this.logService = logService;
        this.errorService = errorService;
        this.storageService = storageService;
        this.authChanged$ = new core_2.EventEmitter();
    }
    AuthService.prototype.getCurrentAuth = function () {
        if (this.currentAuth == null) {
            this.currentAuth = this.storageService.getLocalStorage('authorizationData');
            if (this.currentAuth == null) {
                this.currentAuth = new AuthenticationDetails_1.AuthenticationDetails();
                this.currentAuth.userName = '';
                this.currentAuth.isAuth = false;
            }
            this.authChanged$.emit(this.currentAuth);
        }
        return this.currentAuth;
    };
    AuthService.prototype.authenticate = function (loginInfo) {
        var _this = this;
        var creds = "grant_type=password&username=" + loginInfo.userName + "&password=" + loginInfo.password
            + "&client_id=default&client_secret=no-secret&scope=all";
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('X-XSRF-TOKEN', this.storageService.getCookie('XSRF-TOKEN'));
        this.http.post(this.constants.getServiceBaseUrl() + 'connect/token', creds, {
            headers: headers
        }).map(function (res) { return res.json(); }).subscribe(function (data) {
            data.userName = loginInfo.userName;
            _this.currentAuth = data;
            _this.currentAuth.isAuth = true;
            _this.storageService.setLocalStorage('authorizationData', _this.currentAuth);
            _this.authChanged$.emit(_this.currentAuth);
        }, function (err) {
            _this.logService.log(JSON.stringify(err));
            _this.errorService.logError(new ErrorInfo_1.ErrorInfo(JSON.stringify(err)));
        });
    };
    AuthService.prototype.clearAuthData = function () {
        this.currentAuth = new AuthenticationDetails_1.AuthenticationDetails();
        this.currentAuth.userName = '';
        this.currentAuth.isAuth = false;
        this.storageService.setLocalStorage('authorizationData', this.currentAuth);
    };
    AuthService.prototype.logout = function () {
        this.clearAuthData();
        this.authChanged$.emit(this.currentAuth);
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, Constants_1.Constants, LogService_1.LogService, ErrorService_1.ErrorService, StorageService_1.StorageService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map