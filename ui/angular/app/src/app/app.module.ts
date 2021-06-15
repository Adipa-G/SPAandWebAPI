import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

//common
import { AuthService } from './common/services/authService';
import { Constants } from './common/services/constants';
import { ErrorService } from './common/services/errorService';
import { HttpClientWrapper } from './common/services/httpClientWrapper';
import { LogService } from './common/services/logService';
import { RegisterService } from './common/services/registerService';
import { StorageService } from './common/services/storageService';
import { UtilsService } from './common/services/utilsService';

import { SortHeader } from "./common/directives/sortHeader";
import { Pagination } from "./common/directives/pagination";
import { UtcToLocal } from "./common/directives/utcToLocal";
import { PrettyPrint } from "./common/directives/prettyPrint";

import { MenuComponent } from './common/components/menuComponent';
import { HomeComponent } from './common/components/homeComponent';
import { ErrorComponent } from './common/components/errorComponent';
import { LoginComponent } from './common/components/loginComponent';
import { RegisterComponent } from './common/components/registerComponent';

//admin
import { ServerLogService } from './admin/services/serverLogService';
import { UserService } from './admin/services/userService';

import { UserListComponent } from './admin/components/userListComponent';
import { HttpLogComponent } from './admin/components/httpLogComponent';
import { LogMessagesComponent } from './admin/components/logMessagesComponent';

import { routing, appRoutingProviders } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        routing
    ],
    declarations: [
        SortHeader,
        Pagination,
        UtcToLocal,
        PrettyPrint,

        MenuComponent,
        HomeComponent,
        ErrorComponent,
        LoginComponent,
        RegisterComponent,

        UserListComponent,
        HttpLogComponent,
        LogMessagesComponent,

        AppComponent
    ],
    providers: [
        AuthService,
        Constants,
        ErrorService,
        HttpClientWrapper,
        LogService,
        RegisterService,
        StorageService,
        UtilsService,
        ServerLogService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }