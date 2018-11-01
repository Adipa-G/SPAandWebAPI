import { NO_ERRORS_SCHEMA } from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';

import { ErrorService } from '../../common/services/errorService';
import { UserService } from '../services/userService';

import { UserListComponent } from './userListComponent';

class MockUserService {
    throwError : boolean;

    getUsers() {
        var result = {
            results: [
                {
                    'id': '1',
                    'userName': 'picardjl'
                },
                {
                    'id': '2',
                    'userName': 'rikerwt'
                }
            ],
            totalCount: 2
        };
        return of(result);
    }

    deleteUser(userName) {
        if (this.throwError) {
            return throwError('error!');
        } else {
            var result = {};
            return of(result);
        }
    }
}

class MockErrorService {
    errorCount: number;

    constructor() {
        this.errorCount = 0;
    }

    handleHttpError(error) {
        this.errorCount ++;
    }
}

describe('UserListComponent', () => {

    let comp: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;

    var errorService = new MockErrorService();
    var userService = new MockUserService();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: ErrorService, useValue: errorService },
                { provide: UserService, useValue: userService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserListComponent);
        fixture.detectChanges();
        comp = fixture.componentInstance;
    });

    it('when constructed then set initial values', (done) => {
        expect(comp.orderAndPage).toBeDefined();
        expect(comp.users.length).toBe(2);
        expect(comp.totalCount).toBe(2);
        done();
    });

    it('when updateView then set values', (done) => {
        comp.orderAndPage = null;
        comp.totalCount = 0;
        comp.users = [];

        var filter = comp.initOrderAndPagingDetails();
        comp.updateView(filter);

        expect(comp.orderAndPage).toBeDefined();
        expect(comp.totalCount).toBe(2);
        expect(comp.users.length).toBe(2);
        done();
    });

    it('when deleteUser then remove user', (done) => {
        comp.deleteUser('rikerwt');

        expect(comp.totalCount).toBe(1);
        expect(comp.users.length).toBe(1);
        done();
    });

    it('when deleteUser error then not remove user', (done) => {
        userService.throwError = true;

        comp.deleteUser('rikerwt');

        expect(comp.totalCount).toBe(2);
        expect(comp.users.length).toBe(2);
        expect(errorService.errorCount).toBe(1);

        done();
    });
});