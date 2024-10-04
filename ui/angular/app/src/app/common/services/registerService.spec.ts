import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { RegistrationInfo } from '../../domain/common/registrationInfo';

import { AuthService } from '../services/authService';
import { Constants } from '../services/constants';
import { ErrorService } from '../services/errorService';
import { HttpClientWrapper } from './httpClientWrapper';
import { LogService } from '../services/logService';
import { StorageService } from '../services/storageService';

import { RegisterService } from './registerService';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RegisterService', () => {
    let constants: Constants;
    let httpTestingController: HttpTestingController;
    let registerService: RegisterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                AuthService,
                Constants,
                ErrorService,
                HttpClientWrapper,
                LogService,
                RegisterService,
                StorageService,
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });

        constants = TestBed.inject(Constants);
        httpTestingController = TestBed.inject(HttpTestingController);
        registerService = TestBed.inject(RegisterService);
    });

    it('should construct', fakeAsync(() => {
        expect(constants).toBeDefined();
        expect(httpTestingController).toBeDefined();
        expect(registerService).toBeDefined();
    }));


    it('when register then should call service', fakeAsync(() => {
        const mockResponse = {
            data: { userName: 'Picard' }
        };

        registerService.register(new RegistrationInfo())
            .subscribe((response: any) => {
                var info = response.data;
                expect(info.userName).toEqual('Picard');
            });

        const req = httpTestingController.expectOne({ method: 'POST', url: 'api/account/register' });
        req.flush(mockResponse);
    }));
});