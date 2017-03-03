import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from './common/services/Constants';
import { UtilsService } from './common/services/UtilsService';
import { StorageService } from './common/services/StorageService';
import { LogService } from './common/services/LogService';
import { ErrorService } from './common/services/ErrorService';
import { AuthService } from './common/services/AuthService';
import { HttpClient } from './common/services/HttpClient';
import { RegisterService } from './common/services/RegisterService';
import { UserService } from './admin/services/UserService';
import { ServerLogService } from './admin/services/ServerLogService';

@Component({
    selector: 'angular-auth-app',
    providers: [Constants, UtilsService, StorageService, LogService, ErrorService,
                AuthService, HttpClient, RegisterService, UserService, ServerLogService],
    templateUrl: './app/app.html'
})

export class AppComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() {
        this.router.navigate(['/home']);
    }
}