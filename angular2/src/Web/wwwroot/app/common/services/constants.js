System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, Constants;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            Constants = (function () {
                function Constants() {
                }
                Constants.prototype.getServiceBaseUrl = function () {
                    return '';
                };
                Constants.prototype.getShortDateFormat = function () {
                    return 'YYYY-MM-DD';
                };
                Constants.prototype.getServerDateFormat = function () {
                    return 'YYYY-MM-DDTHH:mm:ss';
                };
                return Constants;
            }());
            Constants = __decorate([
                core_1.Injectable()
            ], Constants);
            exports_1("Constants", Constants);
        }
    };
});

//# sourceMappingURL=constants.js.map
