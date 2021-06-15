import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorInfo } from '../../domain/errorInfo';
import { ErrorService } from '../services/errorService';

import { ErrorComponent } from './errorComponent';

class MockErrorService {
    public errorOccured$: EventEmitter<ErrorInfo>;

    constructor() {
        this.errorOccured$ = new EventEmitter<ErrorInfo>();
    }
}

describe('ErrorComponent', () => {

    let comp: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;

    var errorService = new MockErrorService();

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: ErrorService, useValue: errorService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorComponent);
        fixture.detectChanges();
        comp = fixture.componentInstance;
    });

    it('when constructed then subscribe', (done) => {
        expect(errorService.errorOccured$.observers.length).toBe(1);
        done();
    });

    it('when onError then push error', (done) => {
        comp.onError(new ErrorInfo('stuffed'));

        expect(comp.currentErrors.length).toBe(1);
        done();
    });
});