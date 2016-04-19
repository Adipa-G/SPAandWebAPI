import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES } from 'angular2/router'

import {AuthenticationDetails} from "../../domain/auth/AuthenticationDetails";
import {AuthService} from "../services/AuthService";

@Component({
    selector: 'common-menu',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: './templates/common/components/MenuComponent.html'
})

export class MenuComponent {
    private currentAuth: AuthenticationDetails;
    private subscription: any;

    constructor(private router: Router,
        private authService: AuthService) {
        this.router = router;
        this.subscription = authService.authChanged$.subscribe(auth => this.onAuthChanged(auth));

        this.currentAuth = new AuthenticationDetails();
    }

    private onAuthChanged(auth: AuthenticationDetails): void {
        this.currentAuth = auth;
        if (this.currentAuth.isAuth) {
            this.router.navigate(['UserList']);
        } else {
            this.router.navigate(['Home']);
        }
    }

    public logOut(): void {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}