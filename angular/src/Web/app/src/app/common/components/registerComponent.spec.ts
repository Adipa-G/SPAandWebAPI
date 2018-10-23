import { FormsModule } from '@angular/forms';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { RegistrationInfo } from '../../domain/common/registrationInfo';

import { ErrorService } from '../services/errorService';
import { RegisterService } from '../services/registerService';

import { RegisterComponent } from './registerComponent';

class MockRegisterService {
    registrationInfo: RegistrationInfo;

    register(reg:RegistrationInfo) {
        this.registrationInfo = reg;

        return of({
            'something': 'something'
        });
    }
}

class MockErrorService {
    handleHttpError(error: any): void {
    }
}

class MockRouter {
    public navigate(route: Array<string>) {
    }
}

describe('RegisterComponent', () => {

    let comp: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    var regervice = new MockRegisterService();
    var errorService = new MockErrorService();
    var router = new MockRouter();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [RegisterComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: RegisterService, useValue: regervice },
                { provide: ErrorService, useValue: errorService },
                { provide: Router, useValue: router }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        fixture.detectChanges();
        comp = fixture.componentInstance;
    });

    it('when register then call service', (done) => {
        comp.register();

        expect(comp.success).toBe(true);
        done();
    });
});