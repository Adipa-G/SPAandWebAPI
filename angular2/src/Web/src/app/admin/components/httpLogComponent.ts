import {Component} from '@angular/core';

import {HttpLogFilter} from '../../domain/admin/HttpLogFilter';
import {HttpLogInfo} from '../../domain/admin/HttpLogInfo';

import {ErrorService} from '../../common/services/ErrorService';
import {UtilsService} from "../../common/services/UtilsService";
import {ServerLogService} from "../services/ServerLogService";

@Component({
    selector: 'http-logs',
    templateUrl: './app/admin/components/httpLogComponent.html'
})

export class HttpLogComponent {
    private filter: HttpLogFilter;
    private errorMessage: string;
    private logLevels: string[];
    private httpLogs: HttpLogInfo[];
    private totalCount: number;

    constructor(private errorService: ErrorService,
        private serverLogService: ServerLogService,
        private utilsService: UtilsService) {
        this.errorService = errorService;
        this.serverLogService = serverLogService;
        this.utilsService = utilsService;
        this.logLevels = [];
        this.httpLogs = [];
        this.totalCount = 0;

        this.filter = this.initFilter();
        this.initializeView();
    }

    private initializeView() {
        this.serverLogService.getLogLevels().subscribe(
            data => {
                this.logLevels = data;
            },
            err => {
                this.errorMessage = JSON.stringify(err);
                this.errorService.handleHttpError(err);
            });
        this.updateView(this.filter);
    }

    private updateView(httpLogFilter: HttpLogFilter) {
        this.filter = httpLogFilter;
        this.filter.fromDate = this.utilsService.dateToUtcServerFormat(this.filter.fromDateLocal);
        this.filter.toDate = this.utilsService.dateToUtcServerFormat(this.filter.toDateLocal);

        this.serverLogService.getLogHttp(this.filter).subscribe(
            data => {
                this.httpLogs = data.results;
                this.totalCount = data.totalCount;
            },
            err => {
                this.errorMessage = JSON.stringify(err);
                this.errorService.handleHttpError(err);
            });
    }

    private initFilter(): HttpLogFilter {
        var httpLogFilter: HttpLogFilter = new HttpLogFilter();
        httpLogFilter.orderField = 'CalledOn';
        httpLogFilter.orderDirection = 'Desc';
        httpLogFilter.pageNumber = 1;
        httpLogFilter.pageSize = 100;
        httpLogFilter.logLevel = '';
        httpLogFilter.trackId = '';
        return httpLogFilter;
    }

    private toggleHeaders(log: HttpLogInfo) {
        log.showHeaders = !log.showHeaders;
    }
}