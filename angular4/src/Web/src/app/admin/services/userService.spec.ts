import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { OrderAndPage } from '../../domain/common/orderAndPage';

import { AuthService } from '../../common/services/authService';
import { Constants } from '../../common/services/constants';
import { ErrorService } from '../../common/services/errorService';
import { HttpClient } from '../../common/services/httpClient';
import { LogService } from '../../common/services/logService';
import { StorageService } from '../../common/services/storageService';

import { UserService } from './userService';

describe('UserService', () => {
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
                UserService,
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
        [MockBackend, Constants, UserService], (mockBackend, constants, userService) => {
            expect(mockBackend).toBeDefined();
            expect(constants).toBeDefined();
            expect(userService).toBeDefined();
        })));

    it('when getUsers then return users', async(inject(
        [MockBackend, Constants, UserService], (mockBackend, constants, userService) => {
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

            userService.getUsers(new OrderAndPage())
                .subscribe((response) => {
                    var users = response.data;

                    expect(users.length).toBe(1);
                    expect(users[0].userName).toEqual('Picard');
                });
        })));

    it('when deleteUser then delete user', async(inject(
        [MockBackend, Constants, UserService], (mockBackend, constants, userService) => {
            const mockResponse = {deleted : true};

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });

            userService.deleteUser('test')
                .subscribe((response) => {
                    expect(response.deleted).toBe(true);
                });
        })));
});