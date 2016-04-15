///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser'
import {provide} from 'angular2/core';
import {HTTP_BINDINGS, HTTP_PROVIDERS, RequestOptions} from 'angular2/http';

import {LogService} from './common/services/LogService';
import {Constants} from './common/services/Constants';
import {ExRequestOptions} from './common/services/ExRequestOptions';
import {AppComponent} from './app'

bootstrap(AppComponent, [
    HTTP_BINDINGS,
    HTTP_PROVIDERS,
    Constants,
    LogService,
    provide(RequestOptions, { useClass: ExRequestOptions })]);