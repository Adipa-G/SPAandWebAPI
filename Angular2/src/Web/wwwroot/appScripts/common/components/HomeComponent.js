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
var AuthService_1 = require("../services/AuthService");
var StorageService_1 = require('../services/StorageService');
var HomeComponent = (function () {
    function HomeComponent(router, authService, storageService) {
        var _this = this;
        this.router = router;
        this.authService = authService;
        this.storageService = storageService;
        this.router = router;
        this.storageService = storageService;
        authService.authChanged$.subscribe(function (auth) { return _this.onAuthChanged(auth); });
        this.currentAuth = authService.getCurrentAuth();
        var authData = this.storageService.getLocalStorage('authorizationData');
        if (authData.userName) {
            this.currentAuth.isAuth = true;
            this.currentAuth.userName = authData.userName;
            this.onAuthChanged(this.currentAuth);
        }
        if (this.currentAuth.isAuth) {
            this.router.navigate(['UserList']);
        }
    }
    HomeComponent.prototype.onAuthChanged = function (auth) {
        this.currentAuth = auth;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'common-home',
            viewProviders: [AuthService_1.AuthService],
            templateUrl: './templates/common/components/HomeComponent.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, AuthService_1.AuthService, StorageService_1.StorageService])
    ], HomeComponent);
    return HomeComponent;
})();
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=HomeComponent.js.map