import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { Constants } from '../services/constants';
import { ErrorService } from '../services/errorService';
import { HttpClientWrapper } from './httpClientWrapper';
import { LogService } from '../services/logService';
import { StorageService } from '../services/storageService';

import { AuthService } from './authService';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';


describe('AuthService', () => {
    let constants: Constants;
    let httpTestingController: HttpTestingController;
    let authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                AuthService,
                Constants,
                ErrorService,
                HttpClientWrapper,
                LogService,
                StorageService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });

        constants = TestBed.inject(Constants);
        httpTestingController = TestBed.inject(HttpTestingController);
        authService = TestBed.inject(AuthService);
    });

    it('should construct', fakeAsync(() => {
        expect(constants).toBeDefined();
        expect(httpTestingController).toBeDefined();
        expect(authService).toBeDefined();
    }));

    it('when authenticate then should call service', fakeAsync(() => {
        const mockResponse = {
            access_token: 'token123',
            token_type: 'Bearer',
            expires_in: '3600'
        };

        authService.authenticate({ userName: 'Picard', password: 'password' } as any);

        const req = httpTestingController.expectOne({ method: 'POST', url: 'connect/token' });
        req.flush(mockResponse);

        expect(authService.currentAuth).toBeDefined();
        expect(authService.currentAuth!.isAuth).toBe(true);
        expect(authService.currentAuth!.userName).toBe('Picard');
        expect(authService.currentAuth!.access_token).toBe('token123');
    }));

    it('when clearAuthData then reset auth', fakeAsync(() => {
        authService.clearAuthData();

        expect(authService.currentAuth).toBeDefined();
        expect(authService.currentAuth!.isAuth).toBe(false);
    }));
});