import {Component} from 'angular2/core';
import {AuthenticationInfo} from '../../domain/auth/AuthenticationInfo';
import {AuthService} from '../services/AuthService';

@Component({
    selector: 'shared-menu',
    viewProviders: [AuthService],
    templateUrl: './templates/shared/components/MenuComponent.html'
})
export class MenuComponent {
    constructor(private authService: AuthService) {
    }
}