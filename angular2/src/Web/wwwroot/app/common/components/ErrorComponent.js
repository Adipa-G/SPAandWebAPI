System.register(["@angular/core", "rxjs/Observable/timer", "../services/ErrorService"], function (exports_1, context_1) {
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
    var core_1, timer_1, ErrorService_1, ErrorComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (timer_1_1) {
                timer_1 = timer_1_1;
            },
            function (ErrorService_1_1) {
                ErrorService_1 = ErrorService_1_1;
            }
        ],
        execute: function () {
            ErrorComponent = (function () {
                function ErrorComponent(errorService) {
                    var _this = this;
                    this.errorService = errorService;
                    this.currentErrors = new Array();
                    this.subscription = errorService.errorOccured$.subscribe(function (error) { return _this.onError(error); });
                    var t = timer_1.timer(10000, 10000);
                    t.subscribe(function (t) { return _this.currentErrors.splice(_this.currentErrors.length - 1, 1); });
                }
                ErrorComponent.prototype.onError = function (error) {
                    this.currentErrors.push(error);
                };
                ErrorComponent.prototype.ngOnDestroy = function () {
                    this.subscription.unsubscribe();
                };
                return ErrorComponent;
            }());
            ErrorComponent = __decorate([
                core_1.Component({
                    selector: 'common-error',
                    templateUrl: './app/common/components/errorComponent.html'
                }),
                __metadata("design:paramtypes", [ErrorService_1.ErrorService])
            ], ErrorComponent);
            exports_1("ErrorComponent", ErrorComponent);
        }
    };
});

//# sourceMappingURL=ErrorComponent.js.map
