import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { map } from "rxjs/operators";

import { HttpLogFilter } from '../../domain/admin/httpLogFilter';
import { LogMessageFilter } from '../../domain/admin/logMessageFilter';
import { HttpLogInfo } from '../../domain/admin/httpLogInfo';

import { HttpClient } from '../../common/services/httpClient';
import { Constants } from '../../common/services/constants';

@Injectable()
export class ServerLogService {
    private httpClient: HttpClient;
    private constants: Constants;

    constructor(@Inject(HttpClient) httpClient: HttpClient,
        @Inject(Constants) constants: Constants) {
        this.httpClient = httpClient;
        this.constants = constants;
    }

    public getLogLevels() {
        return this.httpClient
            .get(this.constants.getServiceBaseUrl() + 'api/log/levels')
            .pipe(map((res: Response) => res.json()));
    }

    public getLoggers() {
        return this.httpClient
            .get(this.constants.getServiceBaseUrl() + 'api/log/loggers')
            .pipe(map((res: Response) => res.json()));
    }

    public getLogMessages(filter: LogMessageFilter) {
        return this.httpClient
            .post(this.constants.getServiceBaseUrl() + 'api/log/logMessages', JSON.stringify(filter))
            .pipe(map((res: Response) => res.json()));
    }

    public getLogHttp(filter: HttpLogFilter) {
        return this.httpClient
            .post(this.constants.getServiceBaseUrl() + 'api/log/logHttp', JSON.stringify(filter))
            .pipe(map((res: Response) => res.json()));
    }
}