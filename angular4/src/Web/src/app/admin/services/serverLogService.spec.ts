import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { HttpLogFilter } from '../../domain/admin/httpLogFilter';
import { LogMessageFilter } from '../../domain/admin/logMessageFilter';

import { AuthService } from '../../common/services/authService';
import { Constants } from '../../common/services/constants';
import { ErrorService } from '../../common/services/errorService';
import { HttpClient } from '../../common/services/httpClient';
import { LogService } from '../../common/services/logService';
import { StorageService } from '../../common/services/storageService';

import { ServerLogService } from './serverLogService';

describe('ServerLogService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                BaseRequestOptions,
                Constants,
                ErrorService,
                HttpClient,
                LogService,
                MockBackend,
                ServerLogService,
                StorageService,
                {
                    provide: Http,
                    useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should construct', async(inject(
        [MockBackend, Constants, ServerLogService], (mockBackend, constants, serverLogService) => {
            expect(mockBackend).toBeDefined();
            expect(constants).toBeDefined();
            expect(serverLogService).toBeDefined();
        })));

    it('when getLogLevels then return log levels', async(inject(
        [MockBackend, Constants, ServerLogService], (mockBackend, constants, serverLogService) => {
            const mockResponse = {
                data: [
                    { level: 'Info 0' }
                ]
            };

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });

            serverLogService.getLogLevels()
                .subscribe((response) => {
                    var levels = response.data;

                    expect(levels.length).toBe(1);
                    expect(levels[0].level).toEqual('Info 0');
                });
        })));

    it('when getLogLevels then return loggers', async(inject(
        [MockBackend, Constants, ServerLogService], (mockBackend, constants, serverLogService) => {
            const mockResponse = {
                data: [
                    { name: 'Http' }
                ]
            };

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });

            serverLogService.getLoggers().subscribe((response) => {
                var loggers = response.data;

                expect(loggers.length).toBe(1);
                expect(loggers[0].name).toEqual('Http');
            });
        })));

    it('when getLogMessages then return messages', async(inject(
        [MockBackend, Constants, ServerLogService], (mockBackend, constants, serverLogService) => {
            const mockResponse = {
                data: [
                    { message: 'Test message' }
                ]
            };

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });

            serverLogService.getLogMessages(new LogMessageFilter()).subscribe((response) => {
                var messages = response.data;

                expect(messages.length).toBe(1);
                expect(messages[0].message).toEqual('Test message');
            });
        })));

    it('when getLogMessages then return logs', async(inject(
        [MockBackend, Constants, ServerLogService], (mockBackend, constants, serverLogService) => {
            const mockResponse = {
                data: [
                    { logMessage: 'Test log' }
                ]
            };

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });

            serverLogService.getLogHttp(new HttpLogFilter()).subscribe((response) => {
                var logs = response.data;

                expect(logs.length).toBe(1);
                expect(logs[0].logMessage).toEqual('Test log');
            });
        })));
});