import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routing';

import { AuthService } from './app/common/services/authService';
import { Constants } from './app/common/services/constants';
import { ErrorService } from './app/common/services/errorService';
import { HttpClientWrapper } from './app/common/services/httpClientWrapper';
import { LogService } from './app/common/services/logService';
import { RegisterService } from './app/common/services/registerService';
import { StorageService } from './app/common/services/storageService';
import { UtilsService } from './app/common/services/utilsService';
import { ServerLogService } from './app/admin/services/serverLogService';
import { UserService } from './app/admin/services/userService';

bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection(),
        provideRouter(appRoutes, withHashLocation()),
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
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
    ]
});