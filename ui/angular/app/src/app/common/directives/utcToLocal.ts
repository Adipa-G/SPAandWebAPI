import { Component, inject, ChangeDetectionStrategy, computed, input } from '@angular/core';
import { DateTime } from 'luxon';

import { Constants } from "../../common/services/constants";

@Component({
    selector: 'app-utc-to-local',
    template: '{{localTimeStr()}}',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})

export class UtcToLocal {
    private constants = inject<Constants>(Constants);

    readonly utcTimeStr = input.required<string>();

    readonly localTimeStr = computed(() => {
        const utcTime = DateTime.fromISO(this.utcTimeStr(), { zone: 'utc' });
        return utcTime.toLocal().toFormat(this.constants.getServerDateFormat());
    });
}