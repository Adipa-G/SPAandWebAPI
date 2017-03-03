import { Component } from '@angular/core';

import { LogMessageFilter } from '../../domain/admin/LogMessageFilter';
import { LogMessageInfo } from '../../domain/admin/LogMessageInfo';

import { ErrorService } from '../../common/services/ErrorService';
import { UtilsService } from "../../common/services/UtilsService";
import { ServerLogService } from "../services/ServerLogService";

@Component({
    selector: 'log-messages',
    templateUrl: './app/admin/components/logMessagesComponent.html'
})

export class LogMessagesComponent {
    private filter: LogMessageFilter;
    private errorMessage: string;
    private logLevels: string[];
    private loggers: string[];
    private logMessages: LogMessageInfo[];
    private totalCount: number;

    constructor(private errorService: ErrorService,
        private serverLogService: ServerLogService,
        private utilsService: UtilsService) {
        this.errorService = errorService;
        this.serverLogService = serverLogService;
        this.utilsService = utilsService;
        this.logLevels = [];
        this.loggers = [];
        this.logMessages = [];
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

        this.serverLogService.getLoggers().subscribe(
            data => {
                this.loggers = data;
            },
            err => {
                this.errorMessage = JSON.stringify(err);
                this.errorService.handleHttpError(err);
            });

        this.updateView(this.filter);
    }

    private updateView(logMessageFilter: LogMessageFilter) {
        this.filter = logMessageFilter;
        this.filter.fromDate = this.utilsService.dateToUtcServerFormat(this.filter.fromDateLocal);
        this.filter.toDate = this.utilsService.dateToUtcServerFormat(this.filter.toDateLocal);

        this.serverLogService.getLogMessages(this.filter).subscribe(
            data => {
                this.logMessages = data.results;
                this.totalCount = data.totalCount;
            },
            err => {
                this.errorMessage = JSON.stringify(err);
                this.errorService.handleHttpError(err);
            });
    }

    private initFilter(): LogMessageFilter {
        var logMessageFilter: LogMessageFilter = new LogMessageFilter();
        logMessageFilter.orderField = 'LogTimestamp';
        logMessageFilter.orderDirection = 'Desc';
        logMessageFilter.pageNumber = 1;
        logMessageFilter.pageSize = 100;
        logMessageFilter.logLevel = '';
        logMessageFilter.logger = '';
        return logMessageFilter;
    }
}