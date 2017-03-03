System.register(["@angular/core"], function (exports_1, context_1) {
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
    var core_1, PrettyPrint;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            PrettyPrint = (function () {
                function PrettyPrint() {
                }
                PrettyPrint.prototype.ngOnChanges = function (changes) {
                    if (!this.sourceStr) {
                        return;
                    }
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
                };
                return PrettyPrint;
            }());
            __decorate([
                core_1.Input('pretty-print'),
                __metadata("design:type", String)
            ], PrettyPrint.prototype, "sourceStr", void 0);
            __decorate([
                core_1.Input('format'),
                __metadata("design:type", String)
            ], PrettyPrint.prototype, "format", void 0);
            PrettyPrint = __decorate([
                core_1.Component({
                    selector: '[pretty-print]',
                    template: '<pre>{{prettyPrintOutput}}</pre>'
                })
            ], PrettyPrint);
            exports_1("PrettyPrint", PrettyPrint);
        }
    };
});

//# sourceMappingURL=prettyPrint.js.map
