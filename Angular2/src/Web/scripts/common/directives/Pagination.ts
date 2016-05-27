import {Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import {OrderAndPage} from '../../domain/common/OrderAndPage';

@Component({
    selector: '[pagination]',
    template: '<div [hidden]="totalPages <= 1" class="btn-group btn-group-sm" role="group">' +
              '     <button type="button" class="btn btn-default" [disabled]="pageOptions.pageNumber === 1" (click)="pageClick(pageOptions.pageNumber - 1)">' +
              '         &nbsp;<i class="fa fa-angle-double-left"></i>' +
              '     </button>' +
              '     <button *ngFor="let number of [1,2,3,4,5]" type="button" class="btn btn-default">{{start + number}}</button>' +
              '     <button type="button" class="btn btn-default" [disabled]="pageOptions.pageNumber === totalCount" (click)="pageClick(pageOptions.pageNumber + 1)">' +
              '         <i class="fa fa-angle-double-right"></i>&nbsp;' +
              '     </button>' +
              '</div>'
})

export class Pagination implements OnChanges {
    @Input('pagination') pageOptions : OrderAndPage;
    @Input('total-count') totalCount: number;
    @Output('page-changed') pageChanged = new EventEmitter<OrderAndPage>();

    private start : number;
    private totalPages: number;

    public pageClick(pageNumber:number): void {
        this.pageOptions.pageNumber = pageNumber;
        this.setPages();
        this.pageChanged.emit(this.pageOptions);
    }

    ngOnChanges(changes) {
        debugger;
        this.setPages();
    }

    private setPages(): void {
        debugger;

        var pageSize = 1;
        if (this.pageOptions.pageSize > 0) {
            pageSize = this.pageOptions.pageSize;
        }

        this.totalPages = this.totalCount / pageSize;

        var start = this.pageOptions.pageNumber - 2;
        if (start < 0) {
            start = 0;
        }

        this.start = start;
    }
}