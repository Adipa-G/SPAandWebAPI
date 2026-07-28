import { Component, OnDestroy, inject, ChangeDetectionStrategy, signal } from '@angular/core';

import {AuthenticationDetails} from '../../domain/auth/authenticationDetails';

import {AuthService} from '../services/authService';

@Component({
    selector: 'app-common-home',
    templateUrl: './homeComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})

export class HomeComponent implements OnDestroy {
    private authService = inject(AuthService);

    currentAuth = signal(new AuthenticationDetails());
    private subscription: any;

    constructor() {
        const authService = this.authService;

        this.subscription = authService.authChanged$.subscribe(auth => this.onAuthChanged(auth));
        this.currentAuth.set(authService.getCurrentAuth());
    }

    onAuthChanged(auth: AuthenticationDetails): void {
        this.currentAuth.set(auth);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}