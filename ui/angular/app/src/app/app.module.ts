import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
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

import { MenuComponent } from './common/components/menuComponent';
import { ErrorComponent } from './common/components/errorComponent';

//admin
import { ServerLogService } from './admin/services/serverLogService';
import { UserService } from './admin/services/userService';

import { routing } from './app.routing';

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        CommonModule,
        FormsModule,
        RouterModule,
        routing,
        MenuComponent,
        ErrorComponent], providers: [
            AuthService,
            Constants,
            ErrorService,
            HttpClientWrapper,
            LogService,
            RegisterService,
            StorageService,
            UtilsService,
            ServerLogService,
            UserService,
            provideHttpClient(withXhr(), withInterceptorsFromDi())
        ]
})
export class AppModule { }