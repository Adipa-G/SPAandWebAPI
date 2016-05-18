import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router'

import {AuthenticationDetails} from '../../domain/auth/AuthenticationDetails';
import {ErrorInfo} from '../../domain/ErrorInfo';

import {AuthService} from '../services/AuthService';
import {ErrorService} from '../services/ErrorService';

@Component({
    selector: 'common-menu',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: './templates/common/components/MenuComponent.html'
})

export class MenuComponent {
    private currentAuth: AuthenticationDetails;

    private authChangedSubscription: any;
    private authErrorSubscription: any;

    constructor(private router: Router,
        private authService: AuthService,
        private errorService: ErrorService) {
        this.router = router;
        this.authChangedSubscription = authService.authChanged$.subscribe(auth => this.onAuthChanged(auth));
        this.authErrorSubscription = errorService.authErrorOccured$.subscribe(auth => this.onAuthError(auth));

        this.currentAuth = new AuthenticationDetails();
    }

    private onAuthChanged(auth: AuthenticationDetails): void {
        if (this.currentAuth.isAuth !== auth.isAuth) {
            if (auth.isAuth) {
                this.router.navigate(['UserList']);
            } else {
                this.router.navigate(['Home']);
            }    
        }

        this.currentAuth = auth;
    }

    private onAuthError(errorInfo: ErrorInfo): void {
        this.authService.clearAuthData();
        this.currentAuth = new AuthenticationDetails();
        this.router.navigate(['Login']);
    }

    public logOut(): void {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.authChangedSubscription.unsubscribe();
        this.authErrorSubscription.unsubscribe();
    }
}