import {Component} from 'angular2/core';
import {MenuComponent} from './shared/components/MenuComponent';

@Component({
    selector: 'angular-auth-app',
    template: '<shared-menu></shared-menu>',
    directives: [MenuComponent]
})
export class AppComponent { }