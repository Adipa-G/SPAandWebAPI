import { HttpService } from "./httpService";

import { CallbackFunction, OrderData, PageData } from "./serviceModels";

export interface HttpLogFilter extends OrderData, PageData {
    orderField: string,
    orderDirection: string,
    pageNumber: number,
    pageSize: number,
    trackingId: string,
    logLevel: string,
    fromDate: string,
    toDate: string
}

export interface HttpLogEntry {
    id: number,
    trackingId: string,
    logTimestamp: string,
    caller: string,
    request: string,
    verb: string,
    requestUri: string,
    requestHeaders: string,
    status: string,
    response: string,
    responseHeaders: string,
    duration: string
}

interface HttpLogEntryResult {
    results: HttpLogEntry[],
    totalCount: number
}

export interface SystemLogFilter extends OrderData, PageData {
    orderField: string,
    orderDirection: string,
    pageNumber: number,
    pageSize: number,
    logger: string,
    logLevel: string,
    fromDate: string,
    toDate: string
}

export interface SystemLogEntry {
    id: number,
    logTimestamp: string,
    logger: string,
    level: string,
    message: string,
    stackTrace: string
}

interface SystemLogEntryResult {
    results: SystemLogEntry[],
    totalCount: number
}

export class LogService {
    httpService: HttpService;

    constructor() {
        this.httpService = new HttpService();
    }

    getLevels = (callback: CallbackFunction<string[]>): void => {
        this.httpService.get('api/log/levels',
            (data: string[]) => {
                callback({
                    success: true,
                    data: data,
                    totalCount: data.length,
                    error: ""
                });
            },
            (error: string) => {
                callback({
                    success: false,
                    error: error,
                    data: [],
                    totalCount: 0
                });
            });
    }

    getLoggers = (callback: CallbackFunction<string[]>): void => {
        this.httpService.get('api/log/loggers',
            (data: string[]) => {
                callback({
                    success: true,
                    data: data,
                    totalCount: data.length,
                    error: ""
                });
            },
            (error: string) => {
                callback({
                    success: false,
                    error: error,
                    data: [],
                    totalCount: 0
                });
            });
    }

    getSystemLogs = (sortAndPage: any, callback: CallbackFunction<SystemLogEntry[]>): void => {
        this.httpService.post('api/log/logMessages',
            sortAndPage,
            (data: SystemLogEntryResult) => {
                callback({
                    success: true,
                    data: data.results,
                    totalCount: data.totalCount,
                    error: ""
                });
            },
            (error: string) => {
                callback({
                    success: false,
                    error: error,
                    data: [],
                    totalCount: 0
                });
            });
    }

    getHttpLogs = (sortAndPage: HttpLogFilter, callback: CallbackFunction<HttpLogEntry[]>): void => {
        this.httpService.post('api/log/logHttp',
            sortAndPage,
            (data: HttpLogEntryResult) => {
                callback({
                    success: true,
                    data: data.results,
                    totalCount: data.totalCount,
                    error: ""
                });
            },
            (error: string) => {
                callback({
                    success: false,
                    error: error,
                    data: [],
                    totalCount: 0
                });
            });
    }
}