import { HttpService } from "./httpService";

export class LogService {
    httpService: HttpService;

    constructor() {
        this.httpService = new HttpService();
    }

    getLevels = (callback: Function): void => {
        this.httpService.get('api/log/levels',
            (data: any) => {
                callback({ success: true, data: data });
            },
            (error: any) => {
                callback({ success: false, error: error });
            });
    }

    getLoggers = (callback: Function): void => {
        this.httpService.get('api/log/loggers',
            (data: any) => {
                callback({ success: true, data: data });
            },
            (error: any) => {
                callback({ success: false, error: error });
            });
    }

    getSystemLogs = (sortAndPage : any, callback: Function): void => {
        this.httpService.post('api/log/logMessages',
            sortAndPage,
            (data: any) => {
                callback({ success: true, data: data.results, totalCount: data.totalCount  });
            },
            (error: any) => {
                callback({ success: false, error: error });
            });
    }

    getHttpLogs = (sortAndPage: any, callback: Function): void => {
        this.httpService.post('api/log/logHttp',
            sortAndPage,
            (data: any) => {
                callback({ success: true, data: data.results });
            },
            (error: any) => {
                callback({ success: false, error: error });
            });
    }
}