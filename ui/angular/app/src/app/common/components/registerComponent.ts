import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { RegistrationInfo } from '../../domain/common/registrationInfo';

import { ErrorService } from '../../common/services/errorService';
import { RegisterService } from '../services/registerService';


@Component({
    selector: 'common-signup',
    templateUrl: './registerComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class RegisterComponent {
    private router = inject(Router);
    private errorService = inject(ErrorService);
    private registerService = inject(RegisterService);

    regInfo: RegistrationInfo;
    success = signal(false);

    constructor() {
        const router = this.router;
        const errorService = this.errorService;
        const registerService = this.registerService;

        this.router = router;
        this.errorService = errorService;
        this.registerService = registerService;
        this.regInfo = new RegistrationInfo();
    }

    register() {
        this.registerService.register(this.regInfo).subscribe({
            next: () => {
                this.success.set(true);
                const t = timer(5000);
                t.subscribe(() => this.router.navigate(['/login']));
            },
            error: err => {
                this.errorService.handleHttpError(err);
            }
        });
    }
}