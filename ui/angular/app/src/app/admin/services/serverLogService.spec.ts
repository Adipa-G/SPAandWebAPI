import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { HttpLogFilter } from '../../domain/admin/httpLogFilter';
import { LogMessageFilter } from '../../domain/admin/logMessageFilter';

import { AuthService } from '../../common/services/authService';
import { Constants } from '../../common/services/constants';
import { ErrorService } from '../../common/services/errorService';
import { HttpClientWrapper } from '../../common/services/httpClientWrapper';
import { LogService } from '../../common/services/logService';
import { StorageService } from '../../common/services/storageService';

import { ServerLogService } from './serverLogService';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ServerLogService', () => {
    let constants: Constants;
    let httpTestingController: HttpTestingController;
    let serverLogService: ServerLogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                AuthService,
                Constants,
                ErrorService,
                HttpClientWrapper,
                LogService,
                ServerLogService,
                StorageService,
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ]
        });

        constants = TestBed.inject(Constants);
        httpTestingController = TestBed.inject(HttpTestingController);
        serverLogService = TestBed.inject(ServerLogService);
    });

    it('should construct', fakeAsync(() => {
        expect(constants).toBeDefined();
        expect(httpTestingController).toBeDefined();
        expect(serverLogService).toBeDefined();
    }));

    it('when getLogLevels then return log levels', fakeAsync(() => {
        const mockResponse = {
            data: [
                { level: 'Info 0' }
            ]
        };

        serverLogService.getLogLevels()
            .subscribe((response: any) => {
                const levels = response.data;

                expect(levels.length).toBe(1);
                expect(levels[0].level).toEqual('Info 0');
            });

        const req = httpTestingController.expectOne('api/log/levels');
        req.flush(mockResponse);
    }));

    it('when getLogLevels then return loggers', fakeAsync(() => {
        const mockResponse = {
            data: [
                { name: 'Http' }
            ]
        };

        serverLogService.getLoggers().subscribe((response: any) => {
            const loggers = response.data;

            expect(loggers.length).toBe(1);
            expect(loggers[0].name).toEqual('Http');
        });

        const req = httpTestingController.expectOne('api/log/loggers');
        req.flush(mockResponse);
    }));

    it('when getLogMessages then return messages', fakeAsync(() => {
        const mockResponse = {
            data: [
                { message: 'Test message' }
            ]
        };

        serverLogService.getLogMessages(new LogMessageFilter()).subscribe((response: any) => {
            const messages = response.data;

            expect(messages.length).toBe(1);
            expect(messages[0].message).toEqual('Test message');
        });

        const req = httpTestingController.expectOne('api/log/logMessages');
        req.flush(mockResponse);
    }));

    it('when getLogMessages then return logs', fakeAsync(() => {
        const mockResponse = {
            data: [
                { logMessage: 'Test log' }
            ]
        };

        serverLogService.getLogHttp(new HttpLogFilter()).subscribe((response: any) => {
            const logs = response.data;

            expect(logs.length).toBe(1);
            expect(logs[0].logMessage).toEqual('Test log');
        });

        const req = httpTestingController.expectOne('api/log/logHttp');
        req.flush(mockResponse);
    }));
});