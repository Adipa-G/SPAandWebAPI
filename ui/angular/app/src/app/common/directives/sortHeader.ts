import { Component, ChangeDetectionStrategy, computed, input, output } from '@angular/core';

import { OrderAndPage } from '../../domain/common/orderAndPage';

@Component({
    selector: '[sort-header]',
    template: '<span (click)=\'headerClick()\' class=\'sort-table-header\'>{{text()}}&nbsp;<i class=\'fa {{sortIcon()}}\'></i></span>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class SortHeader {
    readonly text = input.required<string>();
    readonly orderField = input.required<string>({ alias: "order-field" });
    readonly orderOptions = input.required<OrderAndPage>({ alias: "sort-header" });
    readonly orderChanged = output<OrderAndPage>({ alias: 'order-changed' });

    readonly sortIcon = computed(() => {
        const orderField = this.orderField();
        const orderOptions = this.orderOptions();
        if (orderOptions.orderField === orderField &&
            orderOptions.orderDirection === 'Asc') {
            return 'fa-sort-alpha-asc';
        } else if (orderOptions.orderField === orderField &&
            orderOptions.orderDirection === 'Desc') {
            return 'fa-sort-alpha-desc';
        } else {
            return '';
        }
    });

    public headerClick(): void {
        const orderField = this.orderField();
        const orderOptions = { ...this.orderOptions() };
        if (orderField !== orderOptions.orderField) {
            orderOptions.orderField = orderField;
            orderOptions.orderDirection = 'None';
        }

        if (orderOptions.orderDirection === 'None') {
            orderOptions.orderDirection = 'Asc';
        } else if (orderOptions.orderDirection === 'Asc') {
            orderOptions.orderDirection = 'Desc';
        } else {
            orderOptions.orderDirection = 'None';
        }

        this.orderChanged.emit(orderOptions);
    }
}