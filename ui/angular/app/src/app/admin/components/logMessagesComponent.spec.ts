import { NO_ERRORS_SCHEMA } from '@angular/core';

import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { ErrorService } from '../../common/services/errorService';
import { UtilsService } from '../../common/services/utilsService';
import { ServerLogService } from '../services/serverLogService';

import { LogMessagesComponent } from './logMessagesComponent';

class MockServerLogService {
    getLogLevels() {
        return of(
            [
                {
                    'level': 'Error'
                },
                {
                    'level': 'Info'
                }
            ]
        );
    }

    getLoggers() {
        return of(
            [
                {
                    'name': 'Events'
                },
                {
                    'name': 'Http'
                }
            ]
        );
    }

    getLogMessages() {
        const result = {
            results: [
                {
                    'level': 'Error',
                    'text': 'this is an error'
                },
                {
                    'level': 'Info',
                    'text': 'this is an info'
                }
            ],
            totalCount: 2
        };

        return of(result);
    }
}

class MockErrorService {
}

class MockUtilsService {
    dateToUtcServerFormat() {
        return '11/11/2011';
    }
}

describe('LogMessagesComponent', () => {

    let comp: LogMessagesComponent;
    let fixture: ComponentFixture<LogMessagesComponent>;

    const errorService = new MockErrorService();
    const utilsService = new MockUtilsService();
    const serverLogService = new MockServerLogService();

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LogMessagesComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: ErrorService, useValue: errorService },
                { provide: UtilsService, useValue: utilsService },
                { provide: ServerLogService, useValue: serverLogService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogMessagesComponent);
        fixture.detectChanges();
        comp = fixture.componentInstance;
    });

    it('when constructed then set initial values', (done) => {
        expect(comp.logLevels.length).toBe(2);
        expect(comp.loggers.length).toBe(2);
        expect(comp.filter).toBeDefined();
        expect(comp.totalCount).toBe(2);
        expect(comp.logMessages.length).toBe(2);
        done();
    });

    it('when updateView then set values', (done) => {
        comp.filter = null;
        comp.totalCount = 0;
        comp.logMessages = [];

        const filter = comp.initFilter();
        comp.updateView(filter);

        expect(comp.filter).toBeDefined();
        expect(comp.filter.fromDate).toBe('11/11/2011');
        expect(comp.filter.toDate).toBe('11/11/2011');
        expect(comp.totalCount).toBe(2);
        expect(comp.logMessages.length).toBe(2);
        done();
    });
});