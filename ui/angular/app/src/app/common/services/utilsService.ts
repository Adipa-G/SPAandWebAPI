import { Injectable, inject } from '@angular/core';
import { DateTime } from 'luxon';

import { Constants } from '../../common/services/constants';

@Injectable()
export class UtilsService {
    private constants: Constants;

    constructor() {
        const constants = inject<Constants>(Constants);

        this.constants = constants;
    }

    public dateToUtcServerFormat(date: string): string {
        if (date == null || date.trim().length === 0) {
            return '';
        }

        const localDate = DateTime.fromFormat(date, this.constants.getShortDateFormat());
        if (!localDate.isValid) {
            return '';
        }

        return localDate.toUTC().toFormat(this.constants.getServerDateFormat());
    }
}