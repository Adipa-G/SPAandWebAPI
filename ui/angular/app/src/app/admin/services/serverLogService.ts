import { Injectable, inject } from '@angular/core';

import { map } from "rxjs/operators";

import { HttpLogFilter } from '../../domain/admin/httpLogFilter';
import { LogMessageFilter } from '../../domain/admin/logMessageFilter';

import { HttpClientWrapper } from '../../common/services/httpClientWrapper';
import { Constants } from '../../common/services/constants';

@Injectable()
export class ServerLogService {
    private httpClient: HttpClientWrapper;
    private constants: Constants;

    constructor() {
        const httpClient = inject<HttpClientWrapper>(HttpClientWrapper);
        const constants = inject<Constants>(Constants);

        this.httpClient = httpClient;
        this.constants = constants;
    }

    public getLogLevels() {
        return this.httpClient
            .get(this.constants.getServiceBaseUrl() + 'api/log/levels');
    }

    public getLoggers() {
        return this.httpClient
            .get(this.constants.getServiceBaseUrl() + 'api/log/loggers');
    }

    public getLogMessages(filter: LogMessageFilter) {
        return this.httpClient
            .post(this.constants.getServiceBaseUrl() + 'api/log/logMessages', JSON.stringify(filter));
    }

    public getLogHttp(filter: HttpLogFilter) {
        return this.httpClient
            .post(this.constants.getServiceBaseUrl() + 'api/log/logHttp', JSON.stringify(filter));
    }
}