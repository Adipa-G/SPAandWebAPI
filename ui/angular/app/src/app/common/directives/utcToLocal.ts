import { Component, OnChanges, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import moment from 'moment';

import { Constants } from "../../common/services/constants";

@Component({
    selector: '[utc-to-local]',
    template: '{{localTimeStr}}',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class UtcToLocal implements OnChanges {
    private constants = inject<Constants>(Constants);

    @Input('utc-to-local') utcTimeStr!: string;

    localTimeStr = '';

    constructor() {
        const constants = this.constants;

        this.constants = constants;
    }

    ngOnChanges() {
        const localTime = moment.utc(this.utcTimeStr).toDate();
        this.localTimeStr = moment(localTime).format(this.constants.getServerDateFormat());
    }
}