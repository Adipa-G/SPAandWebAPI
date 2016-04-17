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
var AuthenticationInfo_1 = require('../../domain/auth/AuthenticationInfo');
var AuthService_1 = require('../services/AuthService');
var LogService_1 = require('../services/LogService');
var StorageService_1 = require('../services/StorageService');
var LoginComponent = (function () {
    function LoginComponent(router, authService, logService, storageService) {
        this.router = router;
        this.authService = authService;
        this.logService = logService;
        this.storageService = storageService;
        this.router = router;
        this.authService = authService;
        this.logService = logService;
        this.storageService = storageService;
        this.loginInfo = new AuthenticationInfo_1.AuthenticationInfo();
        this.errorMessage = '';
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authService.authenticate(this.loginInfo).subscribe(function (data) {
            _this.storageService.setLocalStorage('authorizationData', data);
            _this.router.navigate(['UserList']);
        }, function (err) {
            _this.errorMessage = JSON.stringify(err);
            _this.logService.log(JSON.stringify(err));
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'common-login',
            viewProviders: [AuthService_1.AuthService],
            templateUrl: './templates/common/components/LoginComponent.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, AuthService_1.AuthService, LogService_1.LogService, StorageService_1.StorageService])
    ], LoginComponent);
    return LoginComponent;
})();
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=LoginComponent.js.map