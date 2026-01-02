import { Injectable, inject } from '@angular/core';
import moment from 'moment';

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

        const momentDate = moment(date, this.constants.getShortDateFormat());
        const result = momentDate.utc().format(this.constants.getServerDateFormat());

        if (result === 'Invalid date') {
            return '';
        }
        return result;
    }
}