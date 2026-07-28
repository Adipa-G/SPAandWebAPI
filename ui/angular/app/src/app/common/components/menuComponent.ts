import { Component, OnDestroy, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationDetails } from '../../domain/auth/authenticationDetails';

import { ErrorService } from '../services/errorService';
import { AuthService } from '../services/authService';

@Component({
    selector: 'common-menu',
    templateUrl: './menuComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class MenuComponent implements OnDestroy {
    private router = inject(Router);
    private authService = inject(AuthService);
    private errorService = inject(ErrorService);

    currentAuth = signal(new AuthenticationDetails());

    authChangedSubscription: any;
    authErrorSubscription: any;

    constructor() {
        const router = this.router;
        const authService = this.authService;
        const errorService = this.errorService;

        this.router = router;
        this.authChangedSubscription = authService.authChanged$.subscribe(auth => this.onAuthChanged(auth));
        this.authErrorSubscription = errorService.authErrorOccured$.subscribe(() => this.onAuthError());
    }

    onAuthChanged(auth: AuthenticationDetails): void {
        if (this.currentAuth().isAuth !== auth.isAuth) {
            if (auth.isAuth) {
                this.router.navigate(['/userList']);
            } else {
                this.router.navigate(['/home']);
            }
        }

        this.currentAuth.set(auth);
    }

    onAuthError(): void {
        this.authService.clearAuthData();
        this.currentAuth.set(new AuthenticationDetails());
        this.router.navigate(['/login']);
    }

    public logOut(): void {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.authChangedSubscription.unsubscribe();
        this.authErrorSubscription.unsubscribe();
    }
}