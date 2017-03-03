System.register(["@angular/core", "@angular/router", "../../domain/auth/AuthenticationDetails", "../services/ErrorService", "../services/AuthService"], function (exports_1, context_1) {
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
    var core_1, router_1, AuthenticationDetails_1, ErrorService_1, AuthService_1, MenuComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (AuthenticationDetails_1_1) {
                AuthenticationDetails_1 = AuthenticationDetails_1_1;
            },
            function (ErrorService_1_1) {
                ErrorService_1 = ErrorService_1_1;
            },
            function (AuthService_1_1) {
                AuthService_1 = AuthService_1_1;
            }
        ],
        execute: function () {
            MenuComponent = (function () {
                function MenuComponent(router, authService, errorService) {
                    var _this = this;
                    this.router = router;
                    this.authService = authService;
                    this.errorService = errorService;
                    this.router = router;
                    this.authChangedSubscription = authService.authChanged$.subscribe(function (auth) { return _this.onAuthChanged(auth); });
                    this.authErrorSubscription = errorService.authErrorOccured$.subscribe(function (auth) { return _this.onAuthError(auth); });
                    this.currentAuth = new AuthenticationDetails_1.AuthenticationDetails();
                }
                MenuComponent.prototype.onAuthChanged = function (auth) {
                    if (this.currentAuth.isAuth !== auth.isAuth) {
                        if (auth.isAuth) {
                            this.router.navigate(['/userList']);
                        }
                        else {
                            this.router.navigate(['/home']);
                        }
                    }
                    this.currentAuth = auth;
                };
                MenuComponent.prototype.onAuthError = function (errorInfo) {
                    this.authService.clearAuthData();
                    this.currentAuth = new AuthenticationDetails_1.AuthenticationDetails();
                    this.router.navigate(['/login']);
                };
                MenuComponent.prototype.logOut = function () {
                    this.authService.logout();
                };
                MenuComponent.prototype.ngOnDestroy = function () {
                    this.authChangedSubscription.unsubscribe();
                    this.authErrorSubscription.unsubscribe();
                };
                return MenuComponent;
            }());
            MenuComponent = __decorate([
                core_1.Component({
                    selector: 'common-menu',
                    templateUrl: './app/common/components/menuComponent.html'
                }),
                __metadata("design:paramtypes", [router_1.Router,
                    AuthService_1.AuthService,
                    ErrorService_1.ErrorService])
            ], MenuComponent);
            exports_1("MenuComponent", MenuComponent);
        }
    };
});

//# sourceMappingURL=menuComponent.js.map
