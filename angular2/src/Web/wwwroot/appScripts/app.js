var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
System.register("domain/auth/AuthenticationDetails", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AuthenticationDetails;
    return {
        setters:[],
        execute: function() {
            class AuthenticationDetails {
            }
            exports_1("AuthenticationDetails", AuthenticationDetails);
        }
    }
});
System.register("domain/ErrorInfo", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var ErrorInfo;
    return {
        setters:[],
        execute: function() {
            class ErrorInfo {
                constructor(message) {
                    this.message = message;
                }
            }
            exports_2("ErrorInfo", ErrorInfo);
        }
    }
});
System.register("domain/auth/LoginInfo", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var LoginInfo;
    return {
        setters:[],
        execute: function() {
            class LoginInfo {
            }
            exports_3("LoginInfo", LoginInfo);
        }
    }
});
System.register("common/services/Constants", ['@angular/core'], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_1;
    var Constants;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            let Constants = class Constants {
                getServiceBaseUrl() {
                    return '';
                }
                getShortDateFormat() {
                    return 'YYYY-MM-DD';
                }
                getServerDateFormat() {
                    return 'YYYY-MM-DDTHH:mm:ss';
                }
            };
            Constants = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [])
            ], Constants);
            exports_4("Constants", Constants);
        }
    }
});
System.register("common/services/LogService", ['@angular/core'], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_2;
    var LogService;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            let LogService = class LogService {
                log(logMsg) {
                    console.log(logMsg);
                }
            };
            LogService = __decorate([
                core_2.Injectable(), 
                __metadata('design:paramtypes', [])
            ], LogService);
            exports_5("LogService", LogService);
        }
    }
});
System.register("common/services/ErrorService", ['@angular/core', "domain/ErrorInfo", "common/services/LogService"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_3, core_4, ErrorInfo_1, LogService_1;
    var ErrorService;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
                core_4 = core_3_1;
            },
            function (ErrorInfo_1_1) {
                ErrorInfo_1 = ErrorInfo_1_1;
            },
            function (LogService_1_1) {
                LogService_1 = LogService_1_1;
            }],
        execute: function() {
            let ErrorService = class ErrorService {
                constructor(logService) {
                    this.logService = logService;
                    this.logService = logService;
                    this.errorOccured$ = new core_4.EventEmitter();
                    this.authErrorOccured$ = new core_4.EventEmitter();
                }
                logError(errInfo) {
                    this.logService.log('Error: ' + errInfo.message);
                    this.errorOccured$.emit(errInfo);
                }
                handleHttpError(error) {
                    var errorInfo = new ErrorInfo_1.ErrorInfo(JSON.stringify(error));
                    if (error.status === 401) {
                        this.logService.log(JSON.stringify(error));
                        this.authErrorOccured$.emit(errorInfo);
                    }
                    else {
                        this.logError(errorInfo);
                    }
                }
            };
            ErrorService = __decorate([
                core_3.Injectable(), 
                __metadata('design:paramtypes', [LogService_1.LogService])
            ], ErrorService);
            exports_6("ErrorService", ErrorService);
        }
    }
});
System.register("common/services/StorageService", ['@angular/core', "common/services/LogService"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_5, LogService_2;
    var StorageService;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (LogService_2_1) {
                LogService_2 = LogService_2_1;
            }],
        execute: function() {
            let StorageService = class StorageService {
                constructor(logService) {
                    this.logService = logService;
                }
                getCookie(name) {
                    let value = "; " + document.cookie;
                    let parts = value.split("; " + name + "=");
                    if (parts.length === 2)
                        return parts.pop().split(";").shift();
                    return null;
                }
                getLocalStorage(key) {
                    var text = localStorage.getItem(key);
                    var data;
                    try {
                        data = JSON.parse(text);
                    }
                    catch (error) {
                        this.logService.log("LocalStorageService::readObject: can't convert string from local storage to object using JSON.parse(). Error: " + error);
                        data = null;
                    }
                    return data;
                }
                setLocalStorage(key, value) {
                    localStorage.setItem(key, JSON.stringify(value));
                }
            };
            StorageService = __decorate([
                core_5.Injectable(),
                __param(0, core_5.Inject(LogService_2.LogService)), 
                __metadata('design:paramtypes', [LogService_2.LogService])
            ], StorageService);
            exports_7("StorageService", StorageService);
        }
    }
});
System.register("common/services/AuthService", ['@angular/core', '@angular/http', "domain/ErrorInfo", "domain/auth/AuthenticationDetails", "common/services/Constants", "common/services/LogService", "common/services/ErrorService", "common/services/StorageService"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_6, core_7, http_1, ErrorInfo_2, AuthenticationDetails_1, Constants_1, LogService_3, ErrorService_1, StorageService_1;
    var AuthService;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
                core_7 = core_6_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ErrorInfo_2_1) {
                ErrorInfo_2 = ErrorInfo_2_1;
            },
            function (AuthenticationDetails_1_1) {
                AuthenticationDetails_1 = AuthenticationDetails_1_1;
            },
            function (Constants_1_1) {
                Constants_1 = Constants_1_1;
            },
            function (LogService_3_1) {
                LogService_3 = LogService_3_1;
            },
            function (ErrorService_1_1) {
                ErrorService_1 = ErrorService_1_1;
            },
            function (StorageService_1_1) {
                StorageService_1 = StorageService_1_1;
            }],
        execute: function() {
            let AuthService = class AuthService {
                constructor(http, constants, logService, errorService, storageService) {
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
                    this.authChanged$ = new core_7.EventEmitter();
                }
                getCurrentAuth() {
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
                }
                authenticate(loginInfo) {
                    var creds = "grant_type=password&username=" + loginInfo.userName + "&password=" + loginInfo.password
                        + "&client_id=default&client_secret=no-secret&scope=all";
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    headers.append('X-XSRF-TOKEN', this.storageService.getCookie('XSRF-TOKEN'));
                    this.http.post(this.constants.getServiceBaseUrl() + 'connect/token', creds, {
                        headers: headers
                    }).map((res) => res.json()).subscribe(data => {
                        data.userName = loginInfo.userName;
                        this.currentAuth = data;
                        this.currentAuth.isAuth = true;
                        this.storageService.setLocalStorage('authorizationData', this.currentAuth);
                        this.authChanged$.emit(this.currentAuth);
                    }, err => {
                        this.logService.log(JSON.stringify(err));
                        this.errorService.logError(new ErrorInfo_2.ErrorInfo(JSON.stringify(err)));
                    });
                }
                clearAuthData() {
                    this.currentAuth = new AuthenticationDetails_1.AuthenticationDetails();
                    this.currentAuth.userName = '';
                    this.currentAuth.isAuth = false;
                    this.storageService.setLocalStorage('authorizationData', this.currentAuth);
                }
                logout() {
                    this.clearAuthData();
                    this.authChanged$.emit(this.currentAuth);
                }
            };
            AuthService = __decorate([
                core_6.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http, Constants_1.Constants, LogService_3.LogService, ErrorService_1.ErrorService, StorageService_1.StorageService])
            ], AuthService);
            exports_8("AuthService", AuthService);
        }
    }
});
System.register("common/components/MenuComponent", ['@angular/core', '@angular/router', "domain/auth/AuthenticationDetails", "common/services/AuthService", "common/services/ErrorService"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_8, router_1, AuthenticationDetails_2, AuthService_1, ErrorService_2;
    var MenuComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (AuthenticationDetails_2_1) {
                AuthenticationDetails_2 = AuthenticationDetails_2_1;
            },
            function (AuthService_1_1) {
                AuthService_1 = AuthService_1_1;
            },
            function (ErrorService_2_1) {
                ErrorService_2 = ErrorService_2_1;
            }],
        execute: function() {
            let MenuComponent = class MenuComponent {
                constructor(router, authService, errorService) {
                    this.router = router;
                    this.authService = authService;
                    this.errorService = errorService;
                    this.router = router;
                    this.authChangedSubscription = authService.authChanged$.subscribe(auth => this.onAuthChanged(auth));
                    this.authErrorSubscription = errorService.authErrorOccured$.subscribe(auth => this.onAuthError(auth));
                    this.currentAuth = new AuthenticationDetails_2.AuthenticationDetails();
                }
                onAuthChanged(auth) {
                    if (this.currentAuth.isAuth !== auth.isAuth) {
                        if (auth.isAuth) {
                            this.router.navigate(['/userList']);
                        }
                        else {
                            this.router.navigate(['/home']);
                        }
                    }
                    this.currentAuth = auth;
                }
                onAuthError(errorInfo) {
                    this.authService.clearAuthData();
                    this.currentAuth = new AuthenticationDetails_2.AuthenticationDetails();
                    this.router.navigate(['/login']);
                }
                logOut() {
                    this.authService.logout();
                }
                ngOnDestroy() {
                    this.authChangedSubscription.unsubscribe();
                    this.authErrorSubscription.unsubscribe();
                }
            };
            MenuComponent = __decorate([
                core_8.Component({
                    selector: 'common-menu',
                    directives: [router_1.ROUTER_DIRECTIVES],
                    templateUrl: './templates/common/components/MenuComponent.html'
                }), 
                __metadata('design:paramtypes', [router_1.Router, AuthService_1.AuthService, ErrorService_2.ErrorService])
            ], MenuComponent);
            exports_9("MenuComponent", MenuComponent);
        }
    }
});
System.register("common/components/HomeComponent", ['@angular/core', "common/services/AuthService"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_9, AuthService_2;
    var HomeComponent;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (AuthService_2_1) {
                AuthService_2 = AuthService_2_1;
            }],
        execute: function() {
            let HomeComponent = class HomeComponent {
                constructor(authService) {
                    this.authService = authService;
                    this.subscription = authService.authChanged$.subscribe(auth => this.onAuthChanged(auth));
                    this.currentAuth = authService.getCurrentAuth();
                }
                onAuthChanged(auth) {
                    this.currentAuth = auth;
                }
                ngOnDestroy() {
                    this.subscription.unsubscribe();
                }
            };
            HomeComponent = __decorate([
                core_9.Component({
                    selector: 'common-home',
                    templateUrl: './templates/common/components/HomeComponent.html'
                }), 
                __metadata('design:paramtypes', [AuthService_2.AuthService])
            ], HomeComponent);
            exports_10("HomeComponent", HomeComponent);
        }
    }
});
System.register("common/components/ErrorComponent", ['@angular/core', 'rxjs/Rx', "common/services/ErrorService"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_10, Rx_1, ErrorService_3;
    var ErrorComponent;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (ErrorService_3_1) {
                ErrorService_3 = ErrorService_3_1;
            }],
        execute: function() {
            let ErrorComponent = class ErrorComponent {
                constructor(errorService) {
                    this.errorService = errorService;
                    this.currentErrors = new Array();
                    this.subscription = errorService.errorOccured$.subscribe(error => this.onError(error));
                    let timer = Rx_1.Observable.timer(10000, 10000);
                    timer.subscribe(t => this.currentErrors.splice(this.currentErrors.length - 1, 1));
                }
                onError(error) {
                    this.currentErrors.push(error);
                }
                ngOnDestroy() {
                    this.subscription.unsubscribe();
                }
            };
            ErrorComponent = __decorate([
                core_10.Component({
                    selector: 'common-error',
                    templateUrl: './templates/common/components/ErrorComponent.html'
                }), 
                __metadata('design:paramtypes', [ErrorService_3.ErrorService])
            ], ErrorComponent);
            exports_11("ErrorComponent", ErrorComponent);
        }
    }
});
System.register("common/components/LoginComponent", ['@angular/core', "domain/auth/LoginInfo", "common/services/AuthService"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_11, LoginInfo_1, AuthService_3;
    var LoginComponent;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (LoginInfo_1_1) {
                LoginInfo_1 = LoginInfo_1_1;
            },
            function (AuthService_3_1) {
                AuthService_3 = AuthService_3_1;
            }],
        execute: function() {
            let LoginComponent = class LoginComponent {
                constructor(authService) {
                    this.authService = authService;
                    this.authService = authService;
                    this.loginInfo = new LoginInfo_1.LoginInfo();
                }
                login() {
                    this.authService.authenticate(this.loginInfo);
                }
            };
            LoginComponent = __decorate([
                core_11.Component({
                    selector: 'common-login',
                    templateUrl: './templates/common/components/LoginComponent.html'
                }), 
                __metadata('design:paramtypes', [AuthService_3.AuthService])
            ], LoginComponent);
            exports_12("LoginComponent", LoginComponent);
        }
    }
});
System.register("domain/common/RegistrationInfo", [], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var RegistrationInfo;
    return {
        setters:[],
        execute: function() {
            class RegistrationInfo {
            }
            exports_13("RegistrationInfo", RegistrationInfo);
        }
    }
});
System.register("common/services/HttpClient", ['@angular/http', '@angular/core', "common/services/LogService", "common/services/ErrorService", "common/services/StorageService", "common/services/AuthService"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var http_2, core_12, LogService_4, ErrorService_4, StorageService_2, AuthService_4;
    var HttpClient;
    return {
        setters:[
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (LogService_4_1) {
                LogService_4 = LogService_4_1;
            },
            function (ErrorService_4_1) {
                ErrorService_4 = ErrorService_4_1;
            },
            function (StorageService_2_1) {
                StorageService_2 = StorageService_2_1;
            },
            function (AuthService_4_1) {
                AuthService_4 = AuthService_4_1;
            }],
        execute: function() {
            let HttpClient = class HttpClient {
                constructor(http, logService, errorService, storageService, authService) {
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
                createHeaders() {
                    var authData = this.authService.getCurrentAuth();
                    var accessToken = authData != null && authData.access_token != null ? authData.access_token : "";
                    var xsrfToken = this.storageService.getCookie('XSRF-TOKEN');
                    return new http_2.Headers({
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': xsrfToken,
                        'Authorization': 'Bearer ' + accessToken
                    });
                }
                get(url) {
                    return this.http.get(url, {
                        headers: this.createHeaders()
                    });
                }
                post(url, data) {
                    return this.http.post(url, data, {
                        headers: this.createHeaders()
                    });
                }
                delete(url) {
                    return this.http.delete(url, {
                        headers: this.createHeaders()
                    });
                }
            };
            HttpClient = __decorate([
                core_12.Injectable(), 
                __metadata('design:paramtypes', [http_2.Http, LogService_4.LogService, ErrorService_4.ErrorService, StorageService_2.StorageService, AuthService_4.AuthService])
            ], HttpClient);
            exports_14("HttpClient", HttpClient);
        }
    }
});
System.register("common/services/RegisterService", ['@angular/core', "common/services/HttpClient", "common/services/Constants"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_13, HttpClient_1, Constants_2;
    var RegisterService;
    return {
        setters:[
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (HttpClient_1_1) {
                HttpClient_1 = HttpClient_1_1;
            },
            function (Constants_2_1) {
                Constants_2 = Constants_2_1;
            }],
        execute: function() {
            let RegisterService = class RegisterService {
                constructor(httpClient, constants) {
                    this.httpClient = httpClient;
                    this.constants = constants;
                }
                register(regInfo) {
                    return this.httpClient
                        .post(this.constants.getServiceBaseUrl() + 'api/account/register', JSON.stringify(regInfo))
                        .map((res) => res.json());
                }
            };
            RegisterService = __decorate([
                core_13.Injectable(),
                __param(0, core_13.Inject(HttpClient_1.HttpClient)),
                __param(1, core_13.Inject(Constants_2.Constants)), 
                __metadata('design:paramtypes', [HttpClient_1.HttpClient, Constants_2.Constants])
            ], RegisterService);
            exports_15("RegisterService", RegisterService);
        }
    }
});
System.register("common/components/RegisterComponent", ['@angular/core', '@angular/router', 'rxjs/Rx', "domain/common/RegistrationInfo", "common/services/RegisterService", "common/services/ErrorService"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_14, router_2, Rx_2, RegistrationInfo_1, RegisterService_1, ErrorService_5;
    var RegisterComponent;
    return {
        setters:[
            function (core_14_1) {
                core_14 = core_14_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (Rx_2_1) {
                Rx_2 = Rx_2_1;
            },
            function (RegistrationInfo_1_1) {
                RegistrationInfo_1 = RegistrationInfo_1_1;
            },
            function (RegisterService_1_1) {
                RegisterService_1 = RegisterService_1_1;
            },
            function (ErrorService_5_1) {
                ErrorService_5 = ErrorService_5_1;
            }],
        execute: function() {
            let RegisterComponent = class RegisterComponent {
                constructor(router, errorService, registerService) {
                    this.router = router;
                    this.errorService = errorService;
                    this.registerService = registerService;
                    this.success = false;
                    this.router = router;
                    this.errorService = errorService;
                    this.registerService = registerService;
                    this.regInfo = new RegistrationInfo_1.RegistrationInfo();
                }
                register() {
                    this.registerService.register(this.regInfo).subscribe(data => {
                        this.success = true;
                        let timer = Rx_2.Observable.timer(5000);
                        timer.subscribe(() => this.router.navigate(['/login']));
                    }, err => {
                        this.errorService.handleHttpError(err);
                    });
                }
            };
            RegisterComponent = __decorate([
                core_14.Component({
                    selector: 'common-signup',
                    viewProviders: [RegisterService_1.RegisterService],
                    templateUrl: './templates/common/components/RegisterComponent.html'
                }), 
                __metadata('design:paramtypes', [router_2.Router, ErrorService_5.ErrorService, RegisterService_1.RegisterService])
            ], RegisterComponent);
            exports_16("RegisterComponent", RegisterComponent);
        }
    }
});
System.register("domain/common/OrderAndPage", [], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var OrderAndPage;
    return {
        setters:[],
        execute: function() {
            class OrderAndPage {
            }
            exports_17("OrderAndPage", OrderAndPage);
        }
    }
});
System.register("domain/admin/UserInfo", [], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var UserInfo;
    return {
        setters:[],
        execute: function() {
            class UserInfo {
            }
            exports_18("UserInfo", UserInfo);
        }
    }
});
System.register("admin/services/UserService", ['@angular/core', "common/services/HttpClient", "common/services/Constants"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_15, HttpClient_2, Constants_3;
    var UserService;
    return {
        setters:[
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (HttpClient_2_1) {
                HttpClient_2 = HttpClient_2_1;
            },
            function (Constants_3_1) {
                Constants_3 = Constants_3_1;
            }],
        execute: function() {
            let UserService = class UserService {
                constructor(httpClient, constants) {
                    this.httpClient = httpClient;
                    this.constants = constants;
                }
                getUsers(orderAndPage) {
                    return this.httpClient
                        .post(this.constants.getServiceBaseUrl() + 'api/Account/list', JSON.stringify(orderAndPage))
                        .map((res) => res.json());
                }
                deleteUser(userName) {
                    return this.httpClient
                        .delete(this.constants.getServiceBaseUrl() + 'api/Account/' + userName)
                        .map((res) => res.json());
                }
            };
            UserService = __decorate([
                core_15.Injectable(),
                __param(0, core_15.Inject(HttpClient_2.HttpClient)),
                __param(1, core_15.Inject(Constants_3.Constants)), 
                __metadata('design:paramtypes', [HttpClient_2.HttpClient, Constants_3.Constants])
            ], UserService);
            exports_19("UserService", UserService);
        }
    }
});
System.register("common/directives/SortHeader", ['@angular/core', "domain/common/OrderAndPage"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var core_16, OrderAndPage_1;
    var SortHeader;
    return {
        setters:[
            function (core_16_1) {
                core_16 = core_16_1;
            },
            function (OrderAndPage_1_1) {
                OrderAndPage_1 = OrderAndPage_1_1;
            }],
        execute: function() {
            let SortHeader = class SortHeader {
                constructor() {
                    this.orderChanged = new core_16.EventEmitter();
                }
                headerClick() {
                    if (this.orderField !== this.orderOptions.orderField) {
                        this.orderOptions.orderField = this.orderField;
                        this.orderOptions.orderDirection = 'None';
                    }
                    if (this.orderOptions.orderDirection === 'None') {
                        this.orderOptions.orderDirection = 'Asc';
                    }
                    else if (this.orderOptions.orderDirection === 'Asc') {
                        this.orderOptions.orderDirection = 'Desc';
                    }
                    else {
                        this.orderOptions.orderDirection = 'None';
                    }
                    this.setIcon();
                    this.orderChanged.emit(this.orderOptions);
                }
                ngDoCheck() {
                    this.setIcon();
                }
                setIcon() {
                    if (this.orderOptions.orderField === this.orderField &&
                        this.orderOptions.orderDirection === 'Asc') {
                        this.sortIcon = 'fa-sort-alpha-asc';
                    }
                    else if (this.orderOptions.orderField === this.orderField &&
                        this.orderOptions.orderDirection === 'Desc') {
                        this.sortIcon = 'fa-sort-alpha-desc';
                    }
                    else {
                        this.sortIcon = '';
                    }
                }
            };
            __decorate([
                core_16.Input(), 
                __metadata('design:type', String)
            ], SortHeader.prototype, "text", void 0);
            __decorate([
                core_16.Input('order-field'), 
                __metadata('design:type', String)
            ], SortHeader.prototype, "orderField", void 0);
            __decorate([
                core_16.Input('sort-header'), 
                __metadata('design:type', OrderAndPage_1.OrderAndPage)
            ], SortHeader.prototype, "orderOptions", void 0);
            __decorate([
                core_16.Output('order-changed'), 
                __metadata('design:type', Object)
            ], SortHeader.prototype, "orderChanged", void 0);
            SortHeader = __decorate([
                core_16.Component({
                    selector: '[sort-header]',
                    template: '<span (click)=\'headerClick()\' class=\'sort-table-header\'>{{text}}&nbsp;<i class=\'fa {{sortIcon}}\'></i></span>'
                }), 
                __metadata('design:paramtypes', [])
            ], SortHeader);
            exports_20("SortHeader", SortHeader);
        }
    }
});
System.register("common/directives/Pagination", ['@angular/core', "domain/common/OrderAndPage"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var core_17, OrderAndPage_2;
    var Pagination;
    return {
        setters:[
            function (core_17_1) {
                core_17 = core_17_1;
            },
            function (OrderAndPage_2_1) {
                OrderAndPage_2 = OrderAndPage_2_1;
            }],
        execute: function() {
            let Pagination = class Pagination {
                constructor() {
                    this.pageChanged = new core_17.EventEmitter();
                    this.start = 1;
                }
                pageClick(pageNumber) {
                    if (pageNumber > this.start + 4 && this.start <= this.totalPages) {
                        this.start = this.start + 1;
                    }
                    else if (pageNumber < this.start && this.start > 1) {
                        this.start = this.start - 1;
                    }
                    this.pageOptions.pageNumber = pageNumber;
                    this.setPages();
                    this.pageChanged.emit(this.pageOptions);
                }
                ngOnChanges(changes) {
                    this.setPages();
                }
                setPages() {
                    var pageSize = 1;
                    if (this.pageOptions.pageSize > 0) {
                        pageSize = this.pageOptions.pageSize;
                    }
                    this.totalPages = Math.ceil(this.totalCount / pageSize);
                }
            };
            __decorate([
                core_17.Input('pagination'), 
                __metadata('design:type', OrderAndPage_2.OrderAndPage)
            ], Pagination.prototype, "pageOptions", void 0);
            __decorate([
                core_17.Input('total-count'), 
                __metadata('design:type', Number)
            ], Pagination.prototype, "totalCount", void 0);
            __decorate([
                core_17.Output('page-changed'), 
                __metadata('design:type', Object)
            ], Pagination.prototype, "pageChanged", void 0);
            Pagination = __decorate([
                core_17.Component({
                    selector: '[pagination]',
                    template: '<div [hidden]="totalPages <= 1" class="btn-group btn-group-sm" role="group">' +
                        '     <button type="button" class="btn btn-default" [disabled]="pageOptions.pageNumber === 1" ' +
                        '      (click)="pageClick(pageOptions.pageNumber - 1)">' +
                        '         &nbsp;<i class="fa fa-angle-left"></i>' +
                        '     </button>' +
                        '     <button *ngFor="let number of [0,1,2,3,4]" type="button" class="btn" ' +
                        '       [ngClass]="{\'btn-primary\': pageOptions.pageNumber === (start + number), \'btn-default\': pageOptions.pageNumber != (start + number)}"' +
                        '       [hidden]="(start + number) > totalPages"' +
                        '       (click)="pageClick(start + number)">{{start + number}}' +
                        '     </button>' +
                        '     <button type="button" class="btn btn-default" [disabled]="pageOptions.pageNumber === totalCount" ' +
                        '      (click)="pageClick(pageOptions.pageNumber + 1)">' +
                        '         <i class="fa fa-angle-right"></i>&nbsp;' +
                        '     </button>' +
                        '</div>'
                }), 
                __metadata('design:paramtypes', [])
            ], Pagination);
            exports_21("Pagination", Pagination);
        }
    }
});
System.register("admin/components/UserListComponent", ['@angular/core', "domain/common/OrderAndPage", "common/services/ErrorService", "admin/services/UserService", "common/directives/SortHeader", "common/directives/Pagination"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var core_18, OrderAndPage_3, ErrorService_6, UserService_1, SortHeader_1, Pagination_1;
    var UserListComponent;
    return {
        setters:[
            function (core_18_1) {
                core_18 = core_18_1;
            },
            function (OrderAndPage_3_1) {
                OrderAndPage_3 = OrderAndPage_3_1;
            },
            function (ErrorService_6_1) {
                ErrorService_6 = ErrorService_6_1;
            },
            function (UserService_1_1) {
                UserService_1 = UserService_1_1;
            },
            function (SortHeader_1_1) {
                SortHeader_1 = SortHeader_1_1;
            },
            function (Pagination_1_1) {
                Pagination_1 = Pagination_1_1;
            }],
        execute: function() {
            let UserListComponent = class UserListComponent {
                constructor(errorService, userService) {
                    this.errorService = errorService;
                    this.userService = userService;
                    this.errorService = errorService;
                    this.userService = userService;
                    this.users = [];
                    this.totalCount = 0;
                    this.orderAndPage = this.initOrderAndPagingDetails();
                    this.updateView(this.orderAndPage);
                }
                updateView(orderAndPage) {
                    this.orderAndPage = orderAndPage;
                    this.userService.getUsers(this.orderAndPage).subscribe(data => {
                        this.users = data.results;
                        this.totalCount = data.totalCount;
                    }, err => {
                        this.errorMessage = JSON.stringify(err);
                        this.errorService.handleHttpError(err);
                    });
                }
                initOrderAndPagingDetails() {
                    var orderAndPage = new OrderAndPage_3.OrderAndPage();
                    orderAndPage.orderField = 'UserName';
                    orderAndPage.orderDirection = 'Asc';
                    orderAndPage.pageNumber = 1;
                    orderAndPage.pageSize = 5;
                    return orderAndPage;
                }
                deleteUser(userName) {
                    this.userService.deleteUser(userName).subscribe(data => {
                        for (var i = 0; i < this.users.length; i++) {
                            if (this.users[i].userName === userName) {
                                this.users.splice(i, 1);
                                break;
                            }
                        }
                    }, err => {
                        this.errorMessage = JSON.stringify(err);
                        this.errorService.handleHttpError(err);
                    });
                }
            };
            UserListComponent = __decorate([
                core_18.Component({
                    selector: 'admin-users',
                    viewProviders: [UserService_1.UserService],
                    directives: [SortHeader_1.SortHeader, Pagination_1.Pagination],
                    templateUrl: './templates/admin/components/UserListComponent.html'
                }), 
                __metadata('design:paramtypes', [ErrorService_6.ErrorService, UserService_1.UserService])
            ], UserListComponent);
            exports_22("UserListComponent", UserListComponent);
        }
    }
});
System.register("domain/admin/HttpLogFilter", ["domain/common/OrderAndPage"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var OrderAndPage_4;
    var HttpLogFilter;
    return {
        setters:[
            function (OrderAndPage_4_1) {
                OrderAndPage_4 = OrderAndPage_4_1;
            }],
        execute: function() {
            class HttpLogFilter extends OrderAndPage_4.OrderAndPage {
            }
            exports_23("HttpLogFilter", HttpLogFilter);
        }
    }
});
System.register("domain/admin/HttpLogInfo", [], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var HttpLogInfo;
    return {
        setters:[],
        execute: function() {
            class HttpLogInfo {
            }
            exports_24("HttpLogInfo", HttpLogInfo);
        }
    }
});
System.register("common/services/UtilsService", ['@angular/core', 'moment', "common/services/Constants"], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var core_19, moment_1, Constants_4;
    var UtilsService;
    return {
        setters:[
            function (core_19_1) {
                core_19 = core_19_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            },
            function (Constants_4_1) {
                Constants_4 = Constants_4_1;
            }],
        execute: function() {
            let UtilsService = class UtilsService {
                constructor(constants) {
                    this.constants = constants;
                }
                dateToUtcServerFormat(date) {
                    if (date == null || date.trim().length === 0) {
                        return '';
                    }
                    var momentDate = moment_1.default(date, this.constants.getShortDateFormat());
                    var result = momentDate.utc().format(this.constants.getServerDateFormat());
                    if (result === 'Invalid date') {
                        return '';
                    }
                    return result;
                }
            };
            UtilsService = __decorate([
                core_19.Injectable(),
                __param(0, core_19.Inject(Constants_4.Constants)), 
                __metadata('design:paramtypes', [Constants_4.Constants])
            ], UtilsService);
            exports_25("UtilsService", UtilsService);
        }
    }
});
System.register("domain/admin/LogMessageFilter", ["domain/common/OrderAndPage"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var OrderAndPage_5;
    var LogMessageFilter;
    return {
        setters:[
            function (OrderAndPage_5_1) {
                OrderAndPage_5 = OrderAndPage_5_1;
            }],
        execute: function() {
            class LogMessageFilter extends OrderAndPage_5.OrderAndPage {
            }
            exports_26("LogMessageFilter", LogMessageFilter);
        }
    }
});
System.register("admin/services/ServerLogService", ['@angular/core', "common/services/HttpClient", "common/services/Constants"], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var core_20, HttpClient_3, Constants_5;
    var ServerLogService;
    return {
        setters:[
            function (core_20_1) {
                core_20 = core_20_1;
            },
            function (HttpClient_3_1) {
                HttpClient_3 = HttpClient_3_1;
            },
            function (Constants_5_1) {
                Constants_5 = Constants_5_1;
            }],
        execute: function() {
            let ServerLogService = class ServerLogService {
                constructor(httpClient, constants) {
                    this.httpClient = httpClient;
                    this.constants = constants;
                }
                getLogLevels() {
                    return this.httpClient
                        .get(this.constants.getServiceBaseUrl() + 'api/log/levels')
                        .map((res) => res.json());
                }
                ;
                getLoggers() {
                    return this.httpClient
                        .get(this.constants.getServiceBaseUrl() + 'api/log/loggers')
                        .map((res) => res.json());
                }
                ;
                getLogMessages(filter) {
                    return this.httpClient
                        .post(this.constants.getServiceBaseUrl() + 'api/log/logMessages', JSON.stringify(filter))
                        .map((res) => res.json());
                }
                ;
                getLogHttp(filter) {
                    return this.httpClient
                        .post(this.constants.getServiceBaseUrl() + 'api/log/logHttp', JSON.stringify(filter))
                        .map((res) => res.json());
                }
                ;
            };
            ServerLogService = __decorate([
                core_20.Injectable(),
                __param(0, core_20.Inject(HttpClient_3.HttpClient)),
                __param(1, core_20.Inject(Constants_5.Constants)), 
                __metadata('design:paramtypes', [HttpClient_3.HttpClient, Constants_5.Constants])
            ], ServerLogService);
            exports_27("ServerLogService", ServerLogService);
            ;
        }
    }
});
System.register("common/directives/UtcToLocal", ['@angular/core', 'moment', "common/services/Constants"], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var core_21, moment_2, Constants_6;
    var UtcToLocal;
    return {
        setters:[
            function (core_21_1) {
                core_21 = core_21_1;
            },
            function (moment_2_1) {
                moment_2 = moment_2_1;
            },
            function (Constants_6_1) {
                Constants_6 = Constants_6_1;
            }],
        execute: function() {
            let UtcToLocal = class UtcToLocal {
                constructor(constants) {
                    this.constants = constants;
                    this.constants = constants;
                }
                ngOnChanges(changes) {
                    var localTime = moment_2.default.utc(this.utcTimeStr).toDate();
                    this.localTimeStr = moment_2.default(localTime).format(this.constants.getServerDateFormat());
                }
            };
            __decorate([
                core_21.Input('utc-to-local'), 
                __metadata('design:type', String)
            ], UtcToLocal.prototype, "utcTimeStr", void 0);
            UtcToLocal = __decorate([
                core_21.Component({
                    selector: '[utc-to-local]',
                    template: '{{localTimeStr}}'
                }),
                __param(0, core_21.Inject(Constants_6.Constants)), 
                __metadata('design:paramtypes', [Constants_6.Constants])
            ], UtcToLocal);
            exports_28("UtcToLocal", UtcToLocal);
        }
    }
});
System.register("common/directives/PrettyPrint", ['@angular/core'], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var core_22;
    var PrettyPrint;
    return {
        setters:[
            function (core_22_1) {
                core_22 = core_22_1;
            }],
        execute: function() {
            let PrettyPrint = class PrettyPrint {
                ngOnChanges(changes) {
                    if (!this.sourceStr)
                        return;
                    var fixedStr = this.sourceStr.replace(/Bearer [^\s]*/g, "Bearer (token)");
                    try {
                        if (!this.format || this.format.toLowerCase() === 'json') {
                            this.prettyPrintOutput = JSON.stringify(JSON.parse(fixedStr), null, 2);
                        }
                    }
                    catch (e1) {
                        try {
                            var result = '';
                            var level = 0;
                            for (var i = 0; i < fixedStr.length; i++) {
                                var chr = fixedStr[i];
                                if (['{', '['].indexOf(chr) >= 0) {
                                    level++;
                                }
                                if (['}', ']'].indexOf(chr) >= 0) {
                                    level--;
                                }
                                if (['{', '}', '[', ']', ','].indexOf(chr) >= 0) {
                                    result += '\n';
                                    result += ' '.repeat(level);
                                }
                                result += chr;
                            }
                            this.prettyPrintOutput = result;
                        }
                        catch (e2) {
                            this.prettyPrintOutput = fixedStr;
                        }
                    }
                }
            };
            __decorate([
                core_22.Input('pretty-print'), 
                __metadata('design:type', String)
            ], PrettyPrint.prototype, "sourceStr", void 0);
            __decorate([
                core_22.Input('format'), 
                __metadata('design:type', String)
            ], PrettyPrint.prototype, "format", void 0);
            PrettyPrint = __decorate([
                core_22.Component({
                    selector: '[pretty-print]',
                    template: '<pre>{{prettyPrintOutput}}</pre>'
                }), 
                __metadata('design:paramtypes', [])
            ], PrettyPrint);
            exports_29("PrettyPrint", PrettyPrint);
        }
    }
});
System.register("admin/components/HttpLogComponent", ['@angular/core', "domain/admin/HttpLogFilter", "common/services/ErrorService", "common/services/UtilsService", "admin/services/ServerLogService", "common/directives/SortHeader", "common/directives/Pagination", "common/directives/UtcToLocal", "common/directives/PrettyPrint"], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var core_23, HttpLogFilter_1, ErrorService_7, UtilsService_1, ServerLogService_1, SortHeader_2, Pagination_2, UtcToLocal_1, PrettyPrint_1;
    var HttpLogComponent;
    return {
        setters:[
            function (core_23_1) {
                core_23 = core_23_1;
            },
            function (HttpLogFilter_1_1) {
                HttpLogFilter_1 = HttpLogFilter_1_1;
            },
            function (ErrorService_7_1) {
                ErrorService_7 = ErrorService_7_1;
            },
            function (UtilsService_1_1) {
                UtilsService_1 = UtilsService_1_1;
            },
            function (ServerLogService_1_1) {
                ServerLogService_1 = ServerLogService_1_1;
            },
            function (SortHeader_2_1) {
                SortHeader_2 = SortHeader_2_1;
            },
            function (Pagination_2_1) {
                Pagination_2 = Pagination_2_1;
            },
            function (UtcToLocal_1_1) {
                UtcToLocal_1 = UtcToLocal_1_1;
            },
            function (PrettyPrint_1_1) {
                PrettyPrint_1 = PrettyPrint_1_1;
            }],
        execute: function() {
            let HttpLogComponent = class HttpLogComponent {
                constructor(errorService, serverLogService, utilsService) {
                    this.errorService = errorService;
                    this.serverLogService = serverLogService;
                    this.utilsService = utilsService;
                    this.errorService = errorService;
                    this.serverLogService = serverLogService;
                    this.utilsService = utilsService;
                    this.logLevels = [];
                    this.httpLogs = [];
                    this.totalCount = 0;
                    this.filter = this.initFilter();
                    this.initializeView();
                }
                initializeView() {
                    this.serverLogService.getLogLevels().subscribe(data => {
                        this.logLevels = data;
                    }, err => {
                        this.errorMessage = JSON.stringify(err);
                        this.errorService.handleHttpError(err);
                    });
                    this.updateView(this.filter);
                }
                updateView(httpLogFilter) {
                    this.filter = httpLogFilter;
                    this.filter.fromDate = this.utilsService.dateToUtcServerFormat(this.filter.fromDateLocal);
                    this.filter.toDate = this.utilsService.dateToUtcServerFormat(this.filter.toDateLocal);
                    this.serverLogService.getLogHttp(this.filter).subscribe(data => {
                        this.httpLogs = data.results;
                        this.totalCount = data.totalCount;
                    }, err => {
                        this.errorMessage = JSON.stringify(err);
                        this.errorService.handleHttpError(err);
                    });
                }
                initFilter() {
                    var httpLogFilter = new HttpLogFilter_1.HttpLogFilter();
                    httpLogFilter.orderField = 'CalledOn';
                    httpLogFilter.orderDirection = 'Desc';
                    httpLogFilter.pageNumber = 1;
                    httpLogFilter.pageSize = 100;
                    httpLogFilter.logLevel = '';
                    httpLogFilter.trackId = '';
                    return httpLogFilter;
                }
                toggleHeaders(log) {
                    log.showHeaders = !log.showHeaders;
                }
            };
            HttpLogComponent = __decorate([
                core_23.Component({
                    selector: 'http-logs',
                    viewProviders: [ServerLogService_1.ServerLogService, UtilsService_1.UtilsService],
                    directives: [SortHeader_2.SortHeader, Pagination_2.Pagination, UtcToLocal_1.UtcToLocal, PrettyPrint_1.PrettyPrint],
                    templateUrl: './templates/admin/components/HttpLogComponent.html'
                }), 
                __metadata('design:paramtypes', [ErrorService_7.ErrorService, ServerLogService_1.ServerLogService, UtilsService_1.UtilsService])
            ], HttpLogComponent);
            exports_30("HttpLogComponent", HttpLogComponent);
        }
    }
});
System.register("domain/admin/LogMessageInfo", [], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var LogMessageInfo;
    return {
        setters:[],
        execute: function() {
            class LogMessageInfo {
            }
            exports_31("LogMessageInfo", LogMessageInfo);
        }
    }
});
System.register("admin/components/LogMessagesComponent", ['@angular/core', "domain/admin/LogMessageFilter", "common/services/ErrorService", "common/services/UtilsService", "admin/services/ServerLogService", "common/directives/SortHeader", "common/directives/Pagination", "common/directives/UtcToLocal", "common/directives/PrettyPrint"], function(exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var core_24, LogMessageFilter_1, ErrorService_8, UtilsService_2, ServerLogService_2, SortHeader_3, Pagination_3, UtcToLocal_2, PrettyPrint_2;
    var LogMessagesComponent;
    return {
        setters:[
            function (core_24_1) {
                core_24 = core_24_1;
            },
            function (LogMessageFilter_1_1) {
                LogMessageFilter_1 = LogMessageFilter_1_1;
            },
            function (ErrorService_8_1) {
                ErrorService_8 = ErrorService_8_1;
            },
            function (UtilsService_2_1) {
                UtilsService_2 = UtilsService_2_1;
            },
            function (ServerLogService_2_1) {
                ServerLogService_2 = ServerLogService_2_1;
            },
            function (SortHeader_3_1) {
                SortHeader_3 = SortHeader_3_1;
            },
            function (Pagination_3_1) {
                Pagination_3 = Pagination_3_1;
            },
            function (UtcToLocal_2_1) {
                UtcToLocal_2 = UtcToLocal_2_1;
            },
            function (PrettyPrint_2_1) {
                PrettyPrint_2 = PrettyPrint_2_1;
            }],
        execute: function() {
            let LogMessagesComponent = class LogMessagesComponent {
                constructor(errorService, serverLogService, utilsService) {
                    this.errorService = errorService;
                    this.serverLogService = serverLogService;
                    this.utilsService = utilsService;
                    this.errorService = errorService;
                    this.serverLogService = serverLogService;
                    this.utilsService = utilsService;
                    this.logLevels = [];
                    this.loggers = [];
                    this.logMessages = [];
                    this.totalCount = 0;
                    this.filter = this.initFilter();
                    this.initializeView();
                }
                initializeView() {
                    this.serverLogService.getLogLevels().subscribe(data => {
                        this.logLevels = data;
                    }, err => {
                        this.errorMessage = JSON.stringify(err);
                        this.errorService.handleHttpError(err);
                    });
                    this.serverLogService.getLoggers().subscribe(data => {
                        this.loggers = data;
                    }, err => {
                        this.errorMessage = JSON.stringify(err);
                        this.errorService.handleHttpError(err);
                    });
                    this.updateView(this.filter);
                }
                updateView(logMessageFilter) {
                    this.filter = logMessageFilter;
                    this.filter.fromDate = this.utilsService.dateToUtcServerFormat(this.filter.fromDateLocal);
                    this.filter.toDate = this.utilsService.dateToUtcServerFormat(this.filter.toDateLocal);
                    this.serverLogService.getLogMessages(this.filter).subscribe(data => {
                        this.logMessages = data.results;
                        this.totalCount = data.totalCount;
                    }, err => {
                        this.errorMessage = JSON.stringify(err);
                        this.errorService.handleHttpError(err);
                    });
                }
                initFilter() {
                    var logMessageFilter = new LogMessageFilter_1.LogMessageFilter();
                    logMessageFilter.orderField = 'LogTimestamp';
                    logMessageFilter.orderDirection = 'Desc';
                    logMessageFilter.pageNumber = 1;
                    logMessageFilter.pageSize = 100;
                    logMessageFilter.logLevel = '';
                    logMessageFilter.logger = '';
                    return logMessageFilter;
                }
            };
            LogMessagesComponent = __decorate([
                core_24.Component({
                    selector: 'log-messages',
                    viewProviders: [ServerLogService_2.ServerLogService, UtilsService_2.UtilsService],
                    directives: [SortHeader_3.SortHeader, Pagination_3.Pagination, UtcToLocal_2.UtcToLocal, PrettyPrint_2.PrettyPrint],
                    templateUrl: './templates/admin/components/LogMessagesComponent.html'
                }), 
                __metadata('design:paramtypes', [ErrorService_8.ErrorService, ServerLogService_2.ServerLogService, UtilsService_2.UtilsService])
            ], LogMessagesComponent);
            exports_32("LogMessagesComponent", LogMessagesComponent);
        }
    }
});
System.register("app", ['@angular/core', '@angular/router', 'rxjs/add/operator/map', "common/components/MenuComponent", "common/components/HomeComponent", "common/components/ErrorComponent", "common/components/LoginComponent", "common/components/RegisterComponent", "admin/components/UserListComponent", "admin/components/HttpLogComponent", "admin/components/LogMessagesComponent"], function(exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var core_25, router_3, MenuComponent_1, HomeComponent_1, ErrorComponent_1, LoginComponent_1, RegisterComponent_1, UserListComponent_1, HttpLogComponent_1, LogMessagesComponent_1;
    var AppComponent;
    return {
        setters:[
            function (core_25_1) {
                core_25 = core_25_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (_1) {},
            function (MenuComponent_1_1) {
                MenuComponent_1 = MenuComponent_1_1;
            },
            function (HomeComponent_1_1) {
                HomeComponent_1 = HomeComponent_1_1;
            },
            function (ErrorComponent_1_1) {
                ErrorComponent_1 = ErrorComponent_1_1;
            },
            function (LoginComponent_1_1) {
                LoginComponent_1 = LoginComponent_1_1;
            },
            function (RegisterComponent_1_1) {
                RegisterComponent_1 = RegisterComponent_1_1;
            },
            function (UserListComponent_1_1) {
                UserListComponent_1 = UserListComponent_1_1;
            },
            function (HttpLogComponent_1_1) {
                HttpLogComponent_1 = HttpLogComponent_1_1;
            },
            function (LogMessagesComponent_1_1) {
                LogMessagesComponent_1 = LogMessagesComponent_1_1;
            }],
        execute: function() {
            let AppComponent = class AppComponent {
                constructor(router) {
                    this.router = router;
                }
                ngOnInit() {
                    this.router.navigate(['/home']);
                }
            };
            AppComponent = __decorate([
                core_25.Component({
                    selector: 'angular-auth-app',
                    templateUrl: './templates/app.html',
                    directives: [router_3.ROUTER_DIRECTIVES, MenuComponent_1.MenuComponent, ErrorComponent_1.ErrorComponent, HomeComponent_1.HomeComponent, LoginComponent_1.LoginComponent, UserListComponent_1.UserListComponent],
                    providers: [router_3.ROUTER_PROVIDERS]
                }),
                router_3.Routes([
                    {
                        path: '/home',
                        component: HomeComponent_1.HomeComponent
                    },
                    {
                        path: '/login',
                        component: LoginComponent_1.LoginComponent
                    },
                    {
                        path: '/register',
                        component: RegisterComponent_1.RegisterComponent
                    },
                    {
                        path: '/userList',
                        component: UserListComponent_1.UserListComponent
                    },
                    {
                        path: '/httpLog',
                        component: HttpLogComponent_1.HttpLogComponent
                    },
                    {
                        path: '/logMessages',
                        component: LogMessagesComponent_1.LogMessagesComponent
                    }
                ]), 
                __metadata('design:paramtypes', [router_3.Router])
            ], AppComponent);
            exports_33("AppComponent", AppComponent);
        }
    }
});
///<reference path="../node_modules/@angular/common/index.d.ts"/>
///<reference path="../node_modules/@angular/compiler/index.d.ts"/>
///<reference path="../node_modules/@angular/core/index.d.ts"/>
///<reference path="../node_modules/@angular/http/index.d.ts"/>
///<reference path="../node_modules/@angular/platform-browser/index.d.ts"/>
///<reference path="../node_modules/@angular/platform-browser-dynamic/index.d.ts"/>
System.register("boot", ['@angular/platform-browser-dynamic', '@angular/core', '@angular/http', '@angular/router', '@angular/common', "common/services/Constants", "common/services/LogService", "common/services/ErrorService", "common/services/StorageService", "common/services/AuthService", "common/services/HttpClient", "app"], function(exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var platform_browser_dynamic_1, core_26, http_3, router_4, common_1, Constants_7, LogService_5, ErrorService_9, StorageService_3, AuthService_5, HttpClient_4, app_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (core_26_1) {
                core_26 = core_26_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (Constants_7_1) {
                Constants_7 = Constants_7_1;
            },
            function (LogService_5_1) {
                LogService_5 = LogService_5_1;
            },
            function (ErrorService_9_1) {
                ErrorService_9 = ErrorService_9_1;
            },
            function (StorageService_3_1) {
                StorageService_3 = StorageService_3_1;
            },
            function (AuthService_5_1) {
                AuthService_5 = AuthService_5_1;
            },
            function (HttpClient_4_1) {
                HttpClient_4 = HttpClient_4_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(app_1.AppComponent, [
                http_3.HTTP_BINDINGS,
                http_3.HTTP_PROVIDERS,
                router_4.ROUTER_PROVIDERS,
                Constants_7.Constants,
                LogService_5.LogService,
                ErrorService_9.ErrorService,
                StorageService_3.StorageService,
                AuthService_5.AuthService,
                HttpClient_4.HttpClient,
                core_26.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy })
            ]);
        }
    }
});
