import { Routes } from "@angular/router";

import { HomeComponent } from './common/components/homeComponent';
import { LoginComponent } from './common/components/loginComponent';
import { RegisterComponent } from './common/components/registerComponent';

import { UserListComponent } from './admin/components/userListComponent';
import { HttpLogComponent } from './admin/components/httpLogComponent';
import { LogMessagesComponent } from './admin/components/logMessagesComponent';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'userList', component: UserListComponent },
    { path: 'httpLog', component: HttpLogComponent },
    { path: 'logMessages', component: LogMessagesComponent }
];
