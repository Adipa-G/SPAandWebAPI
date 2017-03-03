System.register(["@angular/core", "../../domain/common/OrderAndPage"], function (exports_1, context_1) {
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
    var core_1, OrderAndPage_1, SortHeader;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (OrderAndPage_1_1) {
                OrderAndPage_1 = OrderAndPage_1_1;
            }
        ],
        execute: function () {
            SortHeader = (function () {
                function SortHeader() {
                    this.orderChanged = new core_1.EventEmitter();
                }
                SortHeader.prototype.headerClick = function () {
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
                };
                SortHeader.prototype.ngDoCheck = function () {
                    this.setIcon();
                };
                SortHeader.prototype.setIcon = function () {
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
                };
                return SortHeader;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], SortHeader.prototype, "text", void 0);
            __decorate([
                core_1.Input('order-field'),
                __metadata("design:type", String)
            ], SortHeader.prototype, "orderField", void 0);
            __decorate([
                core_1.Input('sort-header'),
                __metadata("design:type", OrderAndPage_1.OrderAndPage)
            ], SortHeader.prototype, "orderOptions", void 0);
            __decorate([
                core_1.Output('order-changed'),
                __metadata("design:type", Object)
            ], SortHeader.prototype, "orderChanged", void 0);
            SortHeader = __decorate([
                core_1.Component({
                    selector: '[sort-header]',
                    template: '<span (click)=\'headerClick()\' class=\'sort-table-header\'>{{text}}&nbsp;<i class=\'fa {{sortIcon}}\'></i></span>'
                })
            ], SortHeader);
            exports_1("SortHeader", SortHeader);
        }
    };
});

//# sourceMappingURL=sortHeader.js.map
