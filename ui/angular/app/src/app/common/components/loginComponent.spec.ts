import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInfo } from '../../domain/auth/loginInfo';
import { AuthService } from '../services/authService';

import { LoginComponent } from './loginComponent';

class MockAuthService {
    public loginInfo: LoginInfo;

    public authenticate(loginInfo: LoginInfo): void {
        this.loginInfo = loginInfo;
    }
}

describe('LoginComponent', () => {

    let comp: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    var authService = new MockAuthService();

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [LoginComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: AuthService, useValue: authService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        fixture.detectChanges();
        comp = fixture.componentInstance;
    });

    it('when login then call service', (done) => {
        comp.login();

        expect(authService.loginInfo).toBeDefined();
        done();
    });
});