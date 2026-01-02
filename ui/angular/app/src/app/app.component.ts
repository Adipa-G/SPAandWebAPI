import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from './common/services/constants';
import { UtilsService } from './common/services/utilsService';
import { StorageService } from './common/services/storageService';
import { LogService } from './common/services/logService';
import { ErrorService } from './common/services/errorService';
import { AuthService } from './common/services/authService';
import { HttpClientWrapper } from './common/services/httpClientWrapper';
import { RegisterService } from './common/services/registerService';
import { UserService } from './admin/services/userService';
import { ServerLogService } from './admin/services/serverLogService';

@Component({
    selector: 'angular-auth-app',
    providers: [Constants, UtilsService, StorageService, LogService, ErrorService,
        AuthService, HttpClientWrapper, RegisterService, UserService, ServerLogService],
    templateUrl: './app.html',
    standalone: false
})

export class AppComponent implements OnInit {
    private router = inject(Router);

    ngOnInit() {
        this.router.navigate(['/home']);
    }
}