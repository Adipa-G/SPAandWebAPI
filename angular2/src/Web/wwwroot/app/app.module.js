System.register(["@angular/core", "@angular/platform-browser", "@angular/common", "@angular/http", "@angular/forms", "@angular/router", "./app.component", "./common/services/authService", "./common/services/constants", "./common/services/errorService", "./common/services/httpClient", "./common/services/logService", "./common/services/registerService", "./common/services/storageService", "./common/services/utilsService", "./common/directives/sortHeader", "./common/directives/pagination", "./common/directives/utcToLocal", "./common/directives/prettyPrint", "./common/components/menuComponent", "./common/components/homeComponent", "./common/components/errorComponent", "./common/components/loginComponent", "./common/components/registerComponent", "./admin/components/userListComponent", "./admin/components/httpLogComponent", "./admin/components/logMessagesComponent", "./app.routing"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_browser_1, common_1, http_1, forms_1, router_1, app_component_1, authService_1, constants_1, errorService_1, httpClient_1, logService_1, registerService_1, storageService_1, utilsService_1, sortHeader_1, pagination_1, utcToLocal_1, prettyPrint_1, menuComponent_1, homeComponent_1, errorComponent_1, loginComponent_1, registerComponent_1, userListComponent_1, httpLogComponent_1, logMessagesComponent_1, app_routing_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (authService_1_1) {
                authService_1 = authService_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (errorService_1_1) {
                errorService_1 = errorService_1_1;
            },
            function (httpClient_1_1) {
                httpClient_1 = httpClient_1_1;
            },
            function (logService_1_1) {
                logService_1 = logService_1_1;
            },
            function (registerService_1_1) {
                registerService_1 = registerService_1_1;
            },
            function (storageService_1_1) {
                storageService_1 = storageService_1_1;
            },
            function (utilsService_1_1) {
                utilsService_1 = utilsService_1_1;
            },
            function (sortHeader_1_1) {
                sortHeader_1 = sortHeader_1_1;
            },
            function (pagination_1_1) {
                pagination_1 = pagination_1_1;
            },
            function (utcToLocal_1_1) {
                utcToLocal_1 = utcToLocal_1_1;
            },
            function (prettyPrint_1_1) {
                prettyPrint_1 = prettyPrint_1_1;
            },
            function (menuComponent_1_1) {
                menuComponent_1 = menuComponent_1_1;
            },
            function (homeComponent_1_1) {
                homeComponent_1 = homeComponent_1_1;
            },
            function (errorComponent_1_1) {
                errorComponent_1 = errorComponent_1_1;
            },
            function (loginComponent_1_1) {
                loginComponent_1 = loginComponent_1_1;
            },
            function (registerComponent_1_1) {
                registerComponent_1 = registerComponent_1_1;
            },
            function (userListComponent_1_1) {
                userListComponent_1 = userListComponent_1_1;
            },
            function (httpLogComponent_1_1) {
                httpLogComponent_1 = httpLogComponent_1_1;
            },
            function (logMessagesComponent_1_1) {
                logMessagesComponent_1 = logMessagesComponent_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [
                        platform_browser_1.BrowserModule,
                        common_1.CommonModule,
                        forms_1.FormsModule,
                        http_1.HttpModule,
                        router_1.RouterModule,
                        app_routing_1.routing
                    ],
                    declarations: [
                        sortHeader_1.SortHeader,
                        pagination_1.Pagination,
                        utcToLocal_1.UtcToLocal,
                        prettyPrint_1.PrettyPrint,
                        menuComponent_1.MenuComponent,
                        homeComponent_1.HomeComponent,
                        errorComponent_1.ErrorComponent,
                        loginComponent_1.LoginComponent,
                        registerComponent_1.RegisterComponent,
                        userListComponent_1.UserListComponent,
                        httpLogComponent_1.HttpLogComponent,
                        logMessagesComponent_1.LogMessagesComponent,
                        app_component_1.AppComponent
                    ],
                    providers: [
                        authService_1.AuthService,
                        constants_1.Constants,
                        errorService_1.ErrorService,
                        httpClient_1.HttpClient,
                        logService_1.LogService,
                        registerService_1.RegisterService,
                        storageService_1.StorageService,
                        utilsService_1.UtilsService
                    ],
                    bootstrap: [app_component_1.AppComponent]
                })
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});

//# sourceMappingURL=app.module.js.map
