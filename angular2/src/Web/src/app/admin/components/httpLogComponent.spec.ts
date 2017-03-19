import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ErrorService } from '../../common/services/errorService';
import { UtilsService } from '../../common/services/utilsService';

import { ServerLogService } from '../services/serverLogService';
import { HttpLogComponent } from './httpLogComponent';

class MockServerLogService {
    getLogLevels() {
        return Observable.of(
            [
                {
                    'level': 'Error'
                },
                {
                    'level': 'Info'
                }
            ]
        );
    };

    getLogHttp() {
        var result = {
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
        return Observable.of(result);
    };
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
    let de: DebugElement;
    let el: HTMLElement;

    var errorService = new MockErrorService();
    var utilsService = new MockUtilsService();
    var serverLogService = new MockServerLogService();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HttpLogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: ErrorService, useValue: errorService },
                { provide: UtilsService, useValue: utilsService },
                { provide: ServerLogService, useValue: serverLogService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HttpLogComponent);
        fixture.detectChanges();
        comp = fixture.componentInstance;
    });

    it('when constructed then set initial values', (done) => {
        expect(comp.logLevels.length).toBe(2);
        expect(comp.filter).toBeDefined();
        expect(comp.filter.fromDate).toBe('11/11/2011');
        expect(comp.filter.toDate).toBe('11/11/2011');
        expect(comp.totalCount).toBe(2);
        expect(comp.httpLogs.length).toBe(2);
        done();
    });

    it('when updateView then set values', (done) => {
        comp.filter = null;
        comp.totalCount = 0;
        comp.httpLogs = [];

        var filter = comp.initFilter();
        comp.updateView(filter);

        expect(comp.filter).toBeDefined();
        expect(comp.filter.fromDate).toBe('11/11/2011');
        expect(comp.filter.toDate).toBe('11/11/2011');
        expect(comp.totalCount).toBe(2);
        expect(comp.httpLogs.length).toBe(2);
        done();
    });
});