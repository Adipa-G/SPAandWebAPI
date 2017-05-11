import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthenticationDetails } from '../../domain/auth/authenticationDetails';

import { Constants } from '../services/constants';
import { ErrorService } from '../services/errorService';
import { HttpClient } from '../services/httpClient';
import { LogService } from '../services/logService';
import { StorageService } from '../services/storageService';

import { AuthService } from './authService';

describe('AuthService', () => {
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
        [MockBackend, Constants, AuthService], (mockBackend, constants, authService) => {
            expect(mockBackend).toBeDefined();
            expect(constants).toBeDefined();
            expect(authService).toBeDefined();
        })));

    it('when authenticate then should call service', async(inject(
        [MockBackend, Constants, AuthService], (mockBackend, constants, authService) => {
            const mockResponse = {
                data: [
                    { userName : 'Picard' }
                ]
            };

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });

            authService.authenticate(new AuthenticationDetails());
            expect(authService.currentAuth).toBeDefined();
        })));

    it('when clearAuthData then reset auth', async(inject(
        [MockBackend, Constants, AuthService], (mockBackend, constants, authService) => {
            authService.clearAuthData();

            expect(authService.currentAuth).toBeDefined();
            expect(authService.currentAuth.isAuth).toBe(false);
        })));
});