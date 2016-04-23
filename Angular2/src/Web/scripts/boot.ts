///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser'
import {provide} from 'angular2/core';
import {Http, HTTP_BINDINGS, HTTP_PROVIDERS, RequestOptions, XHRBackend} from 'angular2/http';
import {ROUTER_PROVIDERS,LocationStrategy, HashLocationStrategy } from 'angular2/router';

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