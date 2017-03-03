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
    var core_1, OrderAndPage_1, Pagination;
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
            Pagination = (function () {
                function Pagination() {
                    this.pageChanged = new core_1.EventEmitter();
                    this.start = 1;
                }
                Pagination.prototype.pageClick = function (pageNumber) {
                    if (pageNumber > this.start + 4 && this.start <= this.totalPages) {
                        this.start = this.start + 1;
                    }
                    else if (pageNumber < this.start && this.start > 1) {
                        this.start = this.start - 1;
                    }
                    this.pageOptions.pageNumber = pageNumber;
                    this.setPages();
                    this.pageChanged.emit(this.pageOptions);
                };
                Pagination.prototype.ngOnChanges = function (changes) {
                    this.setPages();
                };
                Pagination.prototype.setPages = function () {
                    var pageSize = 1;
                    if (this.pageOptions.pageSize > 0) {
                        pageSize = this.pageOptions.pageSize;
                    }
                    this.totalPages = Math.ceil(this.totalCount / pageSize);
                };
                return Pagination;
            }());
            __decorate([
                core_1.Input('pagination'),
                __metadata("design:type", OrderAndPage_1.OrderAndPage)
            ], Pagination.prototype, "pageOptions", void 0);
            __decorate([
                core_1.Input('total-count'),
                __metadata("design:type", Number)
            ], Pagination.prototype, "totalCount", void 0);
            __decorate([
                core_1.Output('page-changed'),
                __metadata("design:type", Object)
            ], Pagination.prototype, "pageChanged", void 0);
            Pagination = __decorate([
                core_1.Component({
                    selector: '[pagination]',
                    template: '<div [hidden]="totalPages <= 1" class="btn-group btn-group-sm" role="group">' +
                        '     <button type="button" class="btn btn-default" [disabled]="pageOptions.pageNumber === 1" ' +
                        '      (click)="pageClick(pageOptions.pageNumber - 1)">' +
                        '         &nbsp;<i class="fa fa-angle-left"></i>' +
                        '     </button>' +
                        '     <button *ngFor="let number of [0,1,2,3,4]" type="button" class="btn" ' +
                        '       [ngClass]="{\'btn-primary\': pageOptions.pageNumber === (start + number), \'btn-default\': ' +
                        'pageOptions.pageNumber != (start + number)}"' +
                        '       [hidden]="(start + number) > totalPages"' +
                        '       (click)="pageClick(start + number)">{{start + number}}' +
                        '     </button>' +
                        '     <button type="button" class="btn btn-default" [disabled]="pageOptions.pageNumber === totalCount" ' +
                        '      (click)="pageClick(pageOptions.pageNumber + 1)">' +
                        '         <i class="fa fa-angle-right"></i>&nbsp;' +
                        '     </button>' +
                        '</div>'
                })
            ], Pagination);
            exports_1("Pagination", Pagination);
        }
    };
});

//# sourceMappingURL=pagination.js.map
