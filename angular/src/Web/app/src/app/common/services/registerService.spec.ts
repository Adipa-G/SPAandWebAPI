import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { RegistrationInfo } from '../../domain/common/registrationInfo';

import { AuthService } from '../services/authService';
import { Constants } from '../services/constants';
import { ErrorService } from '../services/errorService';
import { HttpClient } from '../services/httpClient';
import { LogService } from '../services/logService';
import { StorageService } from '../services/storageService';

import { RegisterService } from './registerService';

describe('RegisterService', () => {
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
                RegisterService,
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
        [MockBackend, Constants, RegisterService], (mockBackend, constants, registerService) => {
            expect(mockBackend).toBeDefined();
            expect(constants).toBeDefined();
            expect(registerService).toBeDefined();
        })));

    it('when register then should call service', async(inject(
        [MockBackend, Constants, RegisterService], (mockBackend, constants, registerService) => {
            const mockResponse = {
                data: { userName: 'Picard' }
            };

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });

            registerService.register(new RegistrationInfo())
                .subscribe((response) => {
                    var info = response.data;

                    expect(info.userName).toEqual('Picard');
                });
        })));
});