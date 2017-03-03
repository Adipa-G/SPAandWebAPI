System.register(["@angular/core", "@angular/router", "rxjs/Observable/timer", "../../domain/common/RegistrationInfo", "../../common/services/ErrorService", "../services/RegisterService"], function (exports_1, context_1) {
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
    var core_1, router_1, timer_1, RegistrationInfo_1, ErrorService_1, RegisterService_1, RegisterComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (timer_1_1) {
                timer_1 = timer_1_1;
            },
            function (RegistrationInfo_1_1) {
                RegistrationInfo_1 = RegistrationInfo_1_1;
            },
            function (ErrorService_1_1) {
                ErrorService_1 = ErrorService_1_1;
            },
            function (RegisterService_1_1) {
                RegisterService_1 = RegisterService_1_1;
            }
        ],
        execute: function () {
            RegisterComponent = (function () {
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
                        var t = timer_1.timer(5000);
                        t.subscribe(function () { return _this.router.navigate(['/login']); });
                    }, function (err) {
                        _this.errorService.handleHttpError(err);
                    });
                };
                return RegisterComponent;
            }());
            RegisterComponent = __decorate([
                core_1.Component({
                    selector: 'common-signup',
                    templateUrl: './app/common/components/registerComponent.html'
                }),
                __metadata("design:paramtypes", [router_1.Router,
                    ErrorService_1.ErrorService,
                    RegisterService_1.RegisterService])
            ], RegisterComponent);
            exports_1("RegisterComponent", RegisterComponent);
        }
    };
});

//# sourceMappingURL=registerComponent.js.map
