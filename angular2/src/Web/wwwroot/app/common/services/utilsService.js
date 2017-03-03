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
    var core_1, moment_1, Constants_1, UtilsService;
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
            UtilsService = (function () {
                function UtilsService(constants) {
                    this.constants = constants;
                }
                UtilsService.prototype.dateToUtcServerFormat = function (date) {
                    if (date == null || date.trim().length === 0) {
                        return '';
                    }
                    var momentDate = moment_1.default(date, this.constants.getShortDateFormat());
                    var result = momentDate.utc().format(this.constants.getServerDateFormat());
                    if (result === 'Invalid date') {
                        return '';
                    }
                    return result;
                };
                return UtilsService;
            }());
            UtilsService = __decorate([
                core_1.Injectable(),
                __param(0, core_1.Inject(Constants_1.Constants)),
                __metadata("design:paramtypes", [Constants_1.Constants])
            ], UtilsService);
            exports_1("UtilsService", UtilsService);
        }
    };
});

//# sourceMappingURL=utilsService.js.map
