System.register(["@angular/core", "@angular/router", "./common/services/Constants", "./common/services/UtilsService", "./common/services/StorageService", "./common/services/LogService", "./common/services/ErrorService", "./common/services/AuthService", "./common/services/HttpClient", "./common/services/RegisterService", "./admin/services/UserService", "./admin/services/ServerLogService"], function (exports_1, context_1) {
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
    var core_1, router_1, Constants_1, UtilsService_1, StorageService_1, LogService_1, ErrorService_1, AuthService_1, HttpClient_1, RegisterService_1, UserService_1, ServerLogService_1, AppComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Constants_1_1) {
                Constants_1 = Constants_1_1;
            },
            function (UtilsService_1_1) {
                UtilsService_1 = UtilsService_1_1;
            },
            function (StorageService_1_1) {
                StorageService_1 = StorageService_1_1;
            },
            function (LogService_1_1) {
                LogService_1 = LogService_1_1;
            },
            function (ErrorService_1_1) {
                ErrorService_1 = ErrorService_1_1;
            },
            function (AuthService_1_1) {
                AuthService_1 = AuthService_1_1;
            },
            function (HttpClient_1_1) {
                HttpClient_1 = HttpClient_1_1;
            },
            function (RegisterService_1_1) {
                RegisterService_1 = RegisterService_1_1;
            },
            function (UserService_1_1) {
                UserService_1 = UserService_1_1;
            },
            function (ServerLogService_1_1) {
                ServerLogService_1 = ServerLogService_1_1;
            }
        ],
        execute: function () {
            AppComponent = (function () {
                function AppComponent(router) {
                    this.router = router;
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.router.navigate(['/home']);
                };
                return AppComponent;
            }());
            AppComponent = __decorate([
                core_1.Component({
                    selector: 'angular-auth-app',
                    providers: [Constants_1.Constants, UtilsService_1.UtilsService, StorageService_1.StorageService, LogService_1.LogService, ErrorService_1.ErrorService,
                        AuthService_1.AuthService, HttpClient_1.HttpClient, RegisterService_1.RegisterService, UserService_1.UserService, ServerLogService_1.ServerLogService],
                    templateUrl: './app/app.html'
                }),
                __metadata("design:paramtypes", [router_1.Router])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    };
});

//# sourceMappingURL=app.component.js.map
