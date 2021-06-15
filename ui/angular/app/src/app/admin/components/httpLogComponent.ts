import { Component } from '@angular/core';

import { HttpLogFilter } from '../../domain/admin/httpLogFilter';
import { HttpLogInfo } from '../../domain/admin/httpLogInfo';

import { ErrorService } from '../../common/services/errorService';
import { UtilsService } from "../../common/services/utilsService";
import { ServerLogService } from "../services/serverLogService";

@Component({
    selector: 'http-logs',
    templateUrl: './httpLogComponent.html'
})

export class HttpLogComponent {
    filter: HttpLogFilter;
    errorMessage: string;
    logLevels: string[];
    httpLogs: HttpLogInfo[];
    totalCount: number;

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

    initializeView() {
        this.serverLogService.getLogLevels().subscribe({
            next: (data: any) => {
                this.logLevels = data;
            },
            error: (err) => {
                this.errorMessage = JSON.stringify(err);
                this.errorService.handleHttpError(err);
            }
        });
        this.updateView(this.filter);
    }

    updateView(httpLogFilter: HttpLogFilter) {
        this.filter = httpLogFilter;
        this.filter.fromDate = this.utilsService.dateToUtcServerFormat(this.filter.fromDateLocal);
        this.filter.toDate = this.utilsService.dateToUtcServerFormat(this.filter.toDateLocal);

        this.serverLogService.getLogHttp(this.filter).subscribe({
            next: (data: any) => {
                this.httpLogs = data.results;
                this.totalCount = data.totalCount;
            },
            error: (err) => {
                this.errorMessage = JSON.stringify(err);
                this.errorService.handleHttpError(err);
            }
        });
    }

    initFilter(): HttpLogFilter {
        var httpLogFilter: HttpLogFilter = new HttpLogFilter();
        httpLogFilter.orderField = 'CalledOn';
        httpLogFilter.orderDirection = 'Desc';
        httpLogFilter.pageNumber = 1;
        httpLogFilter.pageSize = 100;
        httpLogFilter.logLevel = '';
        httpLogFilter.trackingId = '';
        return httpLogFilter;
    }

    toggleHeaders(log: HttpLogInfo) {
        log.showHeaders = !log.showHeaders;
    }
}