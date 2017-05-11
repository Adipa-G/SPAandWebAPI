import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import moment from 'moment';

import { Constants } from '../../common/services/constants';

@Injectable()
export class UtilsService {
    private constants: Constants;

    constructor( @Inject(Constants) constants: Constants) {
        this.constants = constants;
    }

    public dateToUtcServerFormat(date: string): string {
        if (date == null || date.trim().length === 0) {
            return '';
        }

        var momentDate = moment(date, this.constants.getShortDateFormat());
        var result = momentDate.utc().format(this.constants.getServerDateFormat());

        if (result === 'Invalid date') {
            return '';
        }
        return result;
    }
}