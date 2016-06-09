import {Component, OnInit} from '@angular/core';
import { Router,Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import 'rxjs/add/operator/map';

import {MenuComponent} from './common/components/MenuComponent';
import {HomeComponent} from './common/components/HomeComponent';
import {ErrorComponent} from './common/components/ErrorComponent';
import {LoginComponent} from './common/components/LoginComponent';
import {RegisterComponent} from './common/components/RegisterComponent';

import {UserListComponent} from './admin/components/UserListComponent';
import {HttpLogComponent} from './admin/components/HttpLogComponent';
import {LogMessagesComponent} from './admin/components/LogMessagesComponent';

@Component({
    selector: 'angular-auth-app',
    templateUrl: './templates/app.html',
    directives: [ROUTER_DIRECTIVES, MenuComponent, ErrorComponent, HomeComponent, LoginComponent, UserListComponent],
    providers: [ROUTER_PROVIDERS]
})

@Routes([
    {
        path: '/home',
        component: HomeComponent
    },
    {
        path: '/login',
        component: LoginComponent
    },
    {
        path: '/register',
        component: RegisterComponent
    },
    {
        path: '/userList',
        component: UserListComponent
    },
    {
        path: '/httpLog',
        component: HttpLogComponent
    },
    {
        path: '/logMessages',
        component: LogMessagesComponent
    }
])

export class AppComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() {
        this.router.navigate(['/home']);
    }   
}