import { Component, OnChanges, Input, inject } from '@angular/core';
import moment from 'moment';

import { Constants } from "../../common/services/constants";

@Component({
    selector: '[utc-to-local]',
    template: '{{localTimeStr}}',
    standalone: false
})

export class UtcToLocal implements OnChanges {
    private constants = inject<Constants>(Constants);

    @Input('utc-to-local') utcTimeStr: string;

    localTimeStr: string;

    constructor() {
        const constants = this.constants;

        this.constants = constants;
    }

    ngOnChanges(changes) {
        const localTime = moment.utc(this.utcTimeStr).toDate();
        this.localTimeStr = moment(localTime).format(this.constants.getServerDateFormat());
    }
}