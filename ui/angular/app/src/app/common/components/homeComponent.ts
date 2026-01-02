import { Component, OnDestroy, inject } from '@angular/core';

import {AuthenticationDetails} from '../../domain/auth/authenticationDetails';

import {AuthService} from '../services/authService';

@Component({
    selector: 'common-home',
    templateUrl: './homeComponent.html',
    standalone: false
})

export class HomeComponent implements OnDestroy {
    private authService = inject(AuthService);

    currentAuth: AuthenticationDetails;
    private subscription: any;

    constructor() {
        const authService = this.authService;

        this.subscription = authService.authChanged$.subscribe(auth => this.onAuthChanged(auth));
        this.currentAuth = authService.getCurrentAuth();
    }

    onAuthChanged(auth: AuthenticationDetails): void {
        this.currentAuth = auth;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}