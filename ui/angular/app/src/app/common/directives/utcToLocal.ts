import { Component, inject, ChangeDetectionStrategy, computed, input } from '@angular/core';
import moment from 'moment';

import { Constants } from "../../common/services/constants";

@Component({
    selector: '[utc-to-local]',
    template: '{{localTimeStr()}}',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class UtcToLocal {
    private constants = inject<Constants>(Constants);

    readonly utcTimeStr = input.required<string>({ alias: "utc-to-local" });

    readonly localTimeStr = computed(() => {
        const localTime = moment.utc(this.utcTimeStr()).toDate();
        return moment(localTime).format(this.constants.getServerDateFormat());
    });
}