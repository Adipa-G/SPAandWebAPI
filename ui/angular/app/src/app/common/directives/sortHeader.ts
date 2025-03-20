﻿import { Component, DoCheck, Input, Output, EventEmitter } from '@angular/core';

import { OrderAndPage } from '../../domain/common/orderAndPage';

@Component({
    selector: '[sort-header]',
    template: '<span (click)=\'headerClick()\' class=\'sort-table-header\'>{{text}}&nbsp;<i class=\'fa {{sortIcon}}\'></i></span>',
    standalone: false
})

export class SortHeader implements DoCheck {
    @Input() text: string;
    @Input('order-field') orderField: string;
    @Input('sort-header') orderOptions: OrderAndPage;
    @Output('order-changed') orderChanged = new EventEmitter<OrderAndPage>();

    sortIcon: string;

    public headerClick(): void {
        if (this.orderField !== this.orderOptions.orderField) {
            this.orderOptions.orderField = this.orderField;
            this.orderOptions.orderDirection = 'None';
        }

        if (this.orderOptions.orderDirection === 'None') {
            this.orderOptions.orderDirection = 'Asc';
        } else if (this.orderOptions.orderDirection === 'Asc') {
            this.orderOptions.orderDirection = 'Desc';
        } else {
            this.orderOptions.orderDirection = 'None';
        }
        this.setIcon();

        this.orderChanged.emit(this.orderOptions);
    }

    ngDoCheck() {
        this.setIcon();
    }

    private setIcon(): void {
        if (this.orderOptions.orderField === this.orderField &&
            this.orderOptions.orderDirection === 'Asc') {
            this.sortIcon = 'fa-sort-alpha-asc';
        } else if (this.orderOptions.orderField === this.orderField &&
            this.orderOptions.orderDirection === 'Desc') {
            this.sortIcon = 'fa-sort-alpha-desc';
        } else {
            this.sortIcon = '';
        }
    }
}