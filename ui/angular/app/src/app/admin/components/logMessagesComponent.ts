import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';

import { OrderAndPage } from '../../domain/common/orderAndPage';
import { LogMessageFilter } from '../../domain/admin/logMessageFilter';
import { LogMessageInfo } from '../../domain/admin/logMessageInfo';

import { ErrorService } from '../../common/services/errorService';
import { UtilsService } from "../../common/services/utilsService";
import { ServerLogService } from "../services/serverLogService";

@Component({
    selector: 'log-messages',
    templateUrl: './logMessagesComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class LogMessagesComponent {
    private errorService = inject(ErrorService);
    private serverLogService = inject(ServerLogService);
    private utilsService = inject(UtilsService);

    filter: LogMessageFilter;
    errorMessage = signal('');
    logLevels = signal<string[]>([]);
    loggers = signal<string[]>([]);
    logMessages = signal<LogMessageInfo[]>([]);
    totalCount = signal(0);

    constructor() {
        const errorService = this.errorService;
        const serverLogService = this.serverLogService;
        const utilsService = this.utilsService;

        this.errorService = errorService;
        this.serverLogService = serverLogService;
        this.utilsService = utilsService;

        this.filter = this.initFilter();
        this.initializeView();
    }

    initializeView() {
        this.serverLogService.getLogLevels().subscribe({
            next: (data: any) => {
                this.logLevels.set(data);
            },
            error: (err) => {
                this.errorMessage.set(JSON.stringify(err));
                this.errorService.handleHttpError(err);
            }
        });

        this.serverLogService.getLoggers().subscribe({
            next: (data: any) => {
                this.loggers.set(data);
            },
            error: (err) => {
                this.errorMessage.set(JSON.stringify(err));
                this.errorService.handleHttpError(err);
            }
        });

        this.updateView(this.filter);
    }

    updateView(orderAndPage: OrderAndPage) {
        this.filter = { ...this.filter, ...orderAndPage };
        this.filter.fromDate = this.utilsService.dateToUtcServerFormat(this.filter.fromDateLocal);
        this.filter.toDate = this.utilsService.dateToUtcServerFormat(this.filter.toDateLocal);

        this.serverLogService.getLogMessages(this.filter).subscribe({
            next: (data: any) => {
                this.logMessages.set(data.results);
                this.totalCount.set(data.totalCount);
            },
            error: (err) => {
                this.errorMessage.set(JSON.stringify(err));
                this.errorService.handleHttpError(err);
            }
        });
    }

    initFilter(): LogMessageFilter {
        const logMessageFilter: LogMessageFilter = new LogMessageFilter();
        logMessageFilter.orderField = 'LogTimestamp';
        logMessageFilter.orderDirection = 'Desc';
        logMessageFilter.pageNumber = 1;
        logMessageFilter.pageSize = 100;
        logMessageFilter.logLevel = '';
        logMessageFilter.logger = '';
        return logMessageFilter;
    }
}