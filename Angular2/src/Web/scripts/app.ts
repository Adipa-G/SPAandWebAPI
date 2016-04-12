import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router'

import {MenuComponent} from './common/components/MenuComponent';
import {HomeComponent} from './common/components/HomeComponent';
import {ErrorComponent} from './common/components/ErrorComponent';

@Component({
    selector: 'angular-auth-app',
    templateUrl: './templates/app.html',
    directives: [ROUTER_DIRECTIVES, MenuComponent, ErrorComponent, HomeComponent],
    providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
    {
        path: '/home',
        name: 'Home',
        component: HomeComponent,
        useAsDefault: true
    }
])

export class AppComponent { }