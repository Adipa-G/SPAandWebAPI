System.register(["@angular/core", "moment", "../../common/services/Constants"], function (exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, moment_1, Constants_1, UtcToLocal;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            },
            function (Constants_1_1) {
                Constants_1 = Constants_1_1;
            }
        ],
        execute: function () {
            UtcToLocal = (function () {
                function UtcToLocal(constants) {
                    this.constants = constants;
                    this.constants = constants;
                }
                UtcToLocal.prototype.ngOnChanges = function (changes) {
                    var localTime = moment_1.default.utc(this.utcTimeStr).toDate();
                    this.localTimeStr = moment_1.default(localTime).format(this.constants.getServerDateFormat());
                };
                return UtcToLocal;
            }());
            __decorate([
                core_1.Input('utc-to-local'),
                __metadata("design:type", String)
            ], UtcToLocal.prototype, "utcTimeStr", void 0);
            UtcToLocal = __decorate([
                core_1.Component({
                    selector: '[utc-to-local]',
                    template: '{{localTimeStr}}'
                }),
                __param(0, core_1.Inject(Constants_1.Constants)),
                __metadata("design:paramtypes", [Constants_1.Constants])
            ], UtcToLocal);
            exports_1("UtcToLocal", UtcToLocal);
        }
    };
});

//# sourceMappingURL=utcToLocal.js.map
