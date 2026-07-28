import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';

import { OrderAndPage } from '../../domain/common/orderAndPage';
import { HttpLogFilter } from '../../domain/admin/httpLogFilter';
import { HttpLogInfo } from '../../domain/admin/httpLogInfo';

import { ErrorService } from '../../common/services/errorService';
import { UtilsService } from "../../common/services/utilsService";
import { ServerLogService } from "../services/serverLogService";

@Component({
    selector: 'http-logs',
    templateUrl: './httpLogComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class HttpLogComponent {
    private errorService = inject(ErrorService);
    private serverLogService = inject(ServerLogService);
    private utilsService = inject(UtilsService);

    filter: HttpLogFilter;
    errorMessage = signal('');
    logLevels = signal<string[]>([]);
    httpLogs = signal<HttpLogInfo[]>([]);
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
        this.updateView(this.filter);
    }

    updateView(orderAndPage: OrderAndPage) {
        this.filter = { ...this.filter, ...orderAndPage };
        this.filter.fromDate = this.utilsService.dateToUtcServerFormat(this.filter.fromDateLocal);
        this.filter.toDate = this.utilsService.dateToUtcServerFormat(this.filter.toDateLocal);

        this.serverLogService.getLogHttp(this.filter).subscribe({
            next: (data: any) => {
                this.httpLogs.set(data.results);
                this.totalCount.set(data.totalCount);
            },
            error: (err) => {
                this.errorMessage.set(JSON.stringify(err));
                this.errorService.handleHttpError(err);
            }
        });
    }

    initFilter(): HttpLogFilter {
        const httpLogFilter: HttpLogFilter = new HttpLogFilter();
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