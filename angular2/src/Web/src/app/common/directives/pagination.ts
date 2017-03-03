import {Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import {OrderAndPage} from '../../domain/common/OrderAndPage';

@Component({
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

export class Pagination implements OnChanges {
    @Input('pagination') pageOptions : OrderAndPage;
    @Input('total-count') totalCount: number;
    @Output('page-changed') pageChanged = new EventEmitter<OrderAndPage>();

    private start : number = 1;
    private totalPages: number;

    public pageClick(pageNumber: number): void {
        if (pageNumber > this.start + 4 && this.start <= this.totalPages) {
            this.start = this.start + 1;
        } else if (pageNumber < this.start && this.start > 1) {
            this.start = this.start - 1;
        }
        this.pageOptions.pageNumber = pageNumber;
        this.setPages();
        this.pageChanged.emit(this.pageOptions);
    }

    ngOnChanges(changes) {
        this.setPages();
    }

    private setPages(): void {
        var pageSize = 1;
        if (this.pageOptions.pageSize > 0) {
            pageSize = this.pageOptions.pageSize;
        }

        this.totalPages = Math.ceil(this.totalCount / pageSize);
    }
}