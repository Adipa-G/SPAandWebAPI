import { NO_ERRORS_SCHEMA } from '@angular/core';

import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { ErrorService } from '../../common/services/errorService';
import { UtilsService } from '../../common/services/utilsService';
import { Constants } from '../../common/services/constants';
import { ServerLogService } from '../services/serverLogService';

import { HttpLogComponent } from './httpLogComponent';

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

    getLogHttp() {
        const result = {
            results: [
                {
                    'id': 1,
                    'level': 'Error',
                    'text': 'this is an error'
                },
                {
                    'id': 2,
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

describe('HttpLogComponent', () => {

    let comp: HttpLogComponent;
    let fixture: ComponentFixture<HttpLogComponent>;

    const errorService = new MockErrorService();
    const utilsService = new MockUtilsService();
    const serverLogService = new MockServerLogService();

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpLogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: ErrorService, useValue: errorService },
                { provide: UtilsService, useValue: utilsService },
                { provide: ServerLogService, useValue: serverLogService },
                Constants
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HttpLogComponent);
        fixture.detectChanges();
        comp = fixture.componentInstance;
    });

    it('when constructed then set initial values', (done) => {
        expect(comp.logLevels().length).toBe(2);
        expect(comp.filter).toBeDefined();
        expect(comp.filter.fromDate).toBe('11/11/2011');
        expect(comp.filter.toDate).toBe('11/11/2011');
        expect(comp.totalCount()).toBe(2);
        expect(comp.httpLogs().length).toBe(2);
        done();
    });

    it('when updateView then set values', (done) => {
        (comp as any).filter = null;
        comp.totalCount.set(0);
        comp.httpLogs.set([]);

        const filter = comp.initFilter();
        comp.updateView(filter);

        expect(comp.filter).toBeDefined();
        expect(comp.filter.fromDate).toBe('11/11/2011');
        expect(comp.filter.toDate).toBe('11/11/2011');
        expect(comp.totalCount()).toBe(2);
        expect(comp.httpLogs().length).toBe(2);
        done();
    });
});