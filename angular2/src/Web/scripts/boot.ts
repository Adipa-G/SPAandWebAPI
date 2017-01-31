///<reference path="../node_modules/@angular/common/index.d.ts"/>
///<reference path="../node_modules/@angular/compiler/index.d.ts"/>
///<reference path="../node_modules/@angular/core/index.d.ts"/>
///<reference path="../node_modules/@angular/http/index.d.ts"/>
///<reference path="../node_modules/@angular/platform-browser/index.d.ts"/>
///<reference path="../node_modules/@angular/platform-browser-dynamic/index.d.ts"/>

import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {Http, HTTP_BINDINGS, HTTP_PROVIDERS, RequestOptions, XHRBackend} from '@angular/http';
import {ROUTER_PROVIDERS } from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {Constants} from './common/services/Constants';
import {LogService} from './common/services/LogService';
import {ErrorService} from './common/services/ErrorService';
import {StorageService} from './common/services/StorageService';
import {AuthService} from './common/services/AuthService';
import {HttpClient} from './common/services/HttpClient';

import {AppComponent} from './app'

bootstrap(AppComponent, [
    HTTP_BINDINGS,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    Constants,
    LogService,
    ErrorService,
    StorageService,
    AuthService,
    HttpClient,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
]);