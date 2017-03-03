import {Injectable, Inject} from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {HttpLogFilter} from '../../domain/admin/HttpLogFilter';
import {LogMessageFilter} from '../../domain/admin/LogMessageFilter';
import {HttpLogInfo} from '../../domain/admin/HttpLogInfo';

import {HttpClient} from '../../common/services/HttpClient';
import {Constants} from '../../common/services/Constants';

@Injectable()
export class ServerLogService {
    private httpClient: HttpClient;
    private constants: Constants;

    constructor( @Inject(HttpClient) httpClient: HttpClient,
        @Inject(Constants) constants: Constants) {
        this.httpClient = httpClient;
        this.constants = constants;
    }

    public getLogLevels() {
        return this.httpClient
            .get(this.constants.getServiceBaseUrl() + 'api/log/levels')
            .map((res: Response) => res.json());
    };

    public getLoggers() {
        return this.httpClient
            .get(this.constants.getServiceBaseUrl() + 'api/log/loggers')
            .map((res: Response) => res.json());
    };

    public getLogMessages(filter: LogMessageFilter) {
        return this.httpClient
            .post(this.constants.getServiceBaseUrl() + 'api/log/logMessages', JSON.stringify(filter))
            .map((res: Response) => res.json());
    };

    public getLogHttp(filter: HttpLogFilter) {
        return this.httpClient
            .post(this.constants.getServiceBaseUrl() + 'api/log/logHttp', JSON.stringify(filter))
            .map((res: Response) => res.json());
    };
};