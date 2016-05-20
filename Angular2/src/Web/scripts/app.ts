import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import 'rxjs/add/operator/map';

import {MenuComponent} from './common/components/MenuComponent';
import {HomeComponent} from './common/components/HomeComponent';
import {ErrorComponent} from './common/components/ErrorComponent';
import {LoginComponent} from './common/components/LoginComponent';
import {RegisterComponent} from './common/components/RegisterComponent';

import {UserListComponent} from './admin/components/UserListComponent';

@Component({
    selector: 'angular-auth-app',
    templateUrl: './templates/app.html',
    directives: [ROUTER_DIRECTIVES, MenuComponent, ErrorComponent, HomeComponent, LoginComponent, UserListComponent],
    providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
    {
        path: '/home',
        name: 'Home',
        component: HomeComponent,
        useAsDefault: true
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterComponent
    },
    {
        path: '/userList',
        name: 'UserList',
        component: UserListComponent
    }
])

export class AppComponent { }