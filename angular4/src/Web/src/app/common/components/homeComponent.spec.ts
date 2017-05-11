import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationDetails } from '../../domain/auth/authenticationDetails';
import { AuthService } from '../services/authService';

import { HomeComponent } from './homeComponent';

class MockAuthService {
    public authChanged$: EventEmitter<AuthenticationDetails>;

    constructor() {
        this.authChanged$ = new EventEmitter<AuthenticationDetails>();
    }

    public getCurrentAuth(): AuthenticationDetails {
        return new AuthenticationDetails();
    }
}

describe('HomeComponent', () => {

    let comp: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    var authService = new MockAuthService();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: AuthService, useValue: authService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        fixture.detectChanges();
        comp = fixture.componentInstance;
    });

    it('when constructed then subscribe', (done) => {
        expect(authService.authChanged$.observers.length).toBe(1);
        done();
    });

    it('when onAuthChanged then set', (done) => {
        comp.onAuthChanged(new AuthenticationDetails());

        expect(comp.currentAuth).toBeDefined();
        done();
    });
});