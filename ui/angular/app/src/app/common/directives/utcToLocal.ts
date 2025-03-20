﻿import { Component, OnChanges, Input, Inject } from '@angular/core';
import moment from 'moment';

import { Constants } from "../../common/services/constants";

@Component({
    selector: '[utc-to-local]',
    template: '{{localTimeStr}}',
    standalone: false
})

export class UtcToLocal implements OnChanges {
    @Input('utc-to-local') utcTimeStr: string;

    localTimeStr: string;

    constructor(@Inject(Constants) private constants: Constants) {
        this.constants = constants;
    }

    ngOnChanges(changes) {
        var localTime = moment.utc(this.utcTimeStr).toDate();
        this.localTimeStr = moment(localTime).format(this.constants.getServerDateFormat());
    }
}