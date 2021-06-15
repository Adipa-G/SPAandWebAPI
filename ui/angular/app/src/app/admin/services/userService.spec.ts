import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OrderAndPage } from '../../domain/common/orderAndPage';

import { AuthService } from '../../common/services/authService';
import { Constants } from '../../common/services/constants';
import { ErrorService } from '../../common/services/errorService';
import { HttpClientWrapper } from '../../common/services/httpClientWrapper';
import { LogService } from '../../common/services/logService';
import { StorageService } from '../../common/services/storageService';

import { UserService } from './userService';

describe('UserService', () => {
    let constants: Constants;
    let httpTestingController: HttpTestingController;
    let userService: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                Constants,
                ErrorService,
                HttpClientWrapper,
                LogService,
                UserService,
                StorageService
            ],
            imports: [
                HttpClientTestingModule
            ]
        });

        constants = TestBed.inject(Constants);
        httpTestingController = TestBed.inject(HttpTestingController);
        userService = TestBed.inject(UserService);
    });

    it('should construct', fakeAsync(() => {
        expect(constants).toBeDefined();
        expect(httpTestingController).toBeDefined();
        expect(userService).toBeDefined();
    }));

    it('when getUsers then return users', fakeAsync(() => {
        const mockResponse = {
            data: [
                { userName: 'Picard' }
            ]
        };

        userService.getUsers(new OrderAndPage())
            .subscribe((response: any) => {
                var users = response.data;

                expect(users.length).toBe(1);
                expect(users[0].userName).toEqual('Picard');
            });

        const req = httpTestingController.expectOne('api/Account/list');
        req.flush(mockResponse);
    }));

    it('when deleteUser then delete user', fakeAsync(() => {
        const mockResponse = { deleted: true };

        userService.deleteUser('test')
            .subscribe((response: any) => {
                expect(response.deleted).toBe(true);
            });

        const req = httpTestingController.expectOne('api/Account/test');
        req.flush(mockResponse);
    }));
});