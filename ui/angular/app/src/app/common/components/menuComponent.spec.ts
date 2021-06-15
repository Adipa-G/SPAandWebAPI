import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorInfo } from '../../domain/errorInfo';
import { AuthenticationDetails } from '../../domain/auth/authenticationDetails';

import { ErrorService } from '../services/errorService';
import { AuthService } from '../services/authService';

import { MenuComponent } from './menuComponent';

class MockAuthService {
    public authChanged$: EventEmitter<AuthenticationDetails>;
    public authCleard: boolean;
    public loggedOut: boolean;

    constructor() {
        this.authChanged$ = new EventEmitter<AuthenticationDetails>();
        this.authCleard = false;
        this.loggedOut = false;
    }

    clearAuthData(): void {
        this.authCleard = true;
    }

    logout(): void {
        this.loggedOut = true;
    }
}

class MockErrorService {
    public authErrorOccured$: EventEmitter<ErrorInfo>;

    constructor() {
        this.authErrorOccured$ = new EventEmitter<ErrorInfo>();
    }
}

class MockRouter {
    public currentRoute: Array<string>;

    public navigate(route: Array<string>) {
        this.currentRoute = route;
    }
}

describe('MenuComponent', () => {

    let comp: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    var authService = new MockAuthService();
    var errorService = new MockErrorService();
    var router = new MockRouter();

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MenuComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: AuthService, useValue: authService },
                { provide: ErrorService, useValue: errorService },
                { provide: Router, useValue: router }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        fixture.detectChanges();
        comp = fixture.componentInstance;
    });

    it('when constructed then subscribe', (done) => {
        expect(authService.authChanged$.observers.length).toBe(1);
        expect(errorService.authErrorOccured$.observers.length).toBe(1);
        done();
    });

    it('when onAuthChanged and not authenticated anymore then goto home', (done) => {
        comp.currentAuth = new AuthenticationDetails();
        comp.currentAuth.isAuth = true;

        var auth = new AuthenticationDetails();
        auth.isAuth = false;

        comp.onAuthChanged(auth);

        expect(router.currentRoute[0]).toBe('/home');
        done();
    });

    it('when onAuthChanged and authenticated then goto userlist', (done) => {
        comp.currentAuth = new AuthenticationDetails();
        comp.currentAuth.isAuth = false;

        var auth = new AuthenticationDetails();
        auth.isAuth = true;

        comp.onAuthChanged(auth);

        expect(router.currentRoute[0]).toBe('/userList');
        done();
    });

    it('when onAuthError then navigate to login', (done) => {
        comp.onAuthError(new ErrorInfo('error'));

        expect(router.currentRoute[0]).toBe('/login');
        expect(authService.authCleard).toBe(true);
        expect(comp.currentAuth).toBeDefined();
        done();
    });

    it('when logout then call service', (done) => {
        comp.logOut();

        expect(authService.loggedOut).toBe(true);
        done();
    });
});