import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs/observable/timer';

import { RegistrationInfo } from '../../domain/common/registrationInfo';

import { ErrorService } from '../../common/services/errorService';
import { RegisterService } from '../services/registerService';


@Component({
    selector: 'common-signup',
    templateUrl: './app/common/components/registerComponent.html'
})

export class RegisterComponent {
    private regInfo: RegistrationInfo;
    private success: boolean = false;

    constructor(private router: Router,
        private errorService: ErrorService,
        private registerService: RegisterService) {
        this.router = router;
        this.errorService = errorService;
        this.registerService = registerService;
        this.regInfo = new RegistrationInfo();
    }

    private register() {
        this.registerService.register(this.regInfo).subscribe(
            data => {
                this.success = true;
                let t = timer(5000);
                t.subscribe(() => this.router.navigate(['/login']));
            },
            err => {
                this.errorService.handleHttpError(err);
            });
    }
}