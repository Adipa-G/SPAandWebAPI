import { Component, ChangeDetectionStrategy, computed, input, output, signal } from '@angular/core';

import { OrderAndPage } from '../../domain/common/orderAndPage';

@Component({
    selector: '[pagination]',
    template: '<div [hidden]="totalPages() <= 1" class="btn-group btn-group-sm" role="group">' +
        '     <button type="button" class="btn btn-default" [disabled]="pageOptions().pageNumber === 1" ' +
        '      (click)="pageClick(pageOptions().pageNumber - 1)">' +
        '         &nbsp;<i class="fa fa-angle-left"></i>' +
        '     </button>' +
        '     <button *ngFor="let number of [0,1,2,3,4]" type="button" class="btn" ' +
        '       [ngClass]="{\'btn-primary\': pageOptions().pageNumber === (start() + number), \'btn-default\': ' +
        'pageOptions().pageNumber != (start() + number)}"' +
        '       [hidden]="(start() + number) > totalPages()"' +
        '       (click)="pageClick(start() + number)">{{start() + number}}' +
        '     </button>' +
        '     <button type="button" class="btn btn-default" [disabled]="pageOptions().pageNumber === totalCount()" ' +
        '      (click)="pageClick(pageOptions().pageNumber + 1)">' +
        '         <i class="fa fa-angle-right"></i>&nbsp;' +
        '     </button>' +
        '</div>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class Pagination {
    readonly pageOptions = input.required<OrderAndPage>({ alias: "pagination" });
    readonly totalCount = input.required<number>({ alias: "total-count" });
    readonly pageChanged = output<OrderAndPage>({ alias: 'page-changed' });

    readonly start = signal(1);

    readonly totalPages = computed(() => {
        let pageSize = 1;
        if (this.pageOptions().pageSize > 0) {
            pageSize = this.pageOptions().pageSize;
        }

        return Math.ceil(this.totalCount() / pageSize);
    });

    public pageClick(pageNumber: number): void {
        const start = this.start();
        const totalPages = this.totalPages();
        if (pageNumber > start + 4 && start <= totalPages) {
            this.start.set(start + 1);
        } else if (pageNumber < start && start > 1) {
            this.start.set(start - 1);
        }
        const pageOptions = { ...this.pageOptions(), pageNumber };
        this.pageChanged.emit(pageOptions);
    }
}