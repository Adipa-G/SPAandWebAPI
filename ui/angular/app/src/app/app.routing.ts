import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './common/components/homeComponent';
import { ErrorComponent } from './common/components/errorComponent';
import { LoginComponent } from './common/components/loginComponent';
import { RegisterComponent } from './common/components/registerComponent';

import { UserListComponent } from './admin/components/userListComponent';
import { HttpLogComponent } from './admin/components/httpLogComponent';
import { LogMessagesComponent } from './admin/components/logMessagesComponent';

import { ModuleWithProviders } from "@angular/core";

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'userList', component: UserListComponent },
    { path: 'httpLog', component: HttpLogComponent },
    { path: 'logMessages', component: LogMessagesComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, { useHash: true });
