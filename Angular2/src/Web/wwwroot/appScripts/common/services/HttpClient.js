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
var http_1 = require('angular2/http');
var core_1 = require('angular2/core');
var LogService_1 = require('./LogService');
var ErrorService_1 = require('./ErrorService');
var StorageService_1 = require('./StorageService');
var AuthService_1 = require('./AuthService');
var HttpClient = (function () {
    function HttpClient(http, logService, errorService, storageService, authService) {
        this.http = http;
        this.logService = logService;
        this.errorService = errorService;
        this.storageService = storageService;
        this.authService = authService;
        this.http = http;
        this.logService = logService;
        this.errorService = errorService;
        this.storageService = storageService;
        this.authService = authService;
    }
    HttpClient.prototype.createHeaders = function () {
        var authData = this.authService.getCurrentAuth();
        var accessToken = authData != null ? authData.access_token : null;
        var xsrfToken = this.storageService.getCookie('XSRF-TOKEN');
        return new http_1.Headers({
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrfToken,
            'Authorization': 'Bearer ' + accessToken
        });
    };
    HttpClient.prototype.get = function (url) {
        return this.http.get(url, {
            headers: this.createHeaders()
        });
    };
    HttpClient.prototype.post = function (url, data) {
        return this.http.post(url, data, {
            headers: this.createHeaders()
        });
    };
    HttpClient.prototype.delete = function (url) {
        return this.http.delete(url, {
            headers: this.createHeaders()
        });
    };
    HttpClient = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, LogService_1.LogService, ErrorService_1.ErrorService, StorageService_1.StorageService, AuthService_1.AuthService])
    ], HttpClient);
    return HttpClient;
}());
exports.HttpClient = HttpClient;
