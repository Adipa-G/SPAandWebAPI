///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {HTTP_BINDINGS} from 'angular2/http';
import {bootstrap} from 'angular2/platform/browser'

import {LogService} from './common/services/LogService';
import {Constants} from './common/services/Constants';
import {AppComponent} from './app'

bootstrap(AppComponent, [HTTP_BINDINGS, Constants, LogService]);