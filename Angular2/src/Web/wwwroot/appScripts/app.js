"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
require('rxjs/add/operator/map');
var MenuComponent_1 = require('./common/components/MenuComponent');
var HomeComponent_1 = require('./common/components/HomeComponent');
var ErrorComponent_1 = require('./common/components/ErrorComponent');
var LoginComponent_1 = require('./common/components/LoginComponent');
var RegisterComponent_1 = require('./common/components/RegisterComponent');
var UserListComponent_1 = require('./admin/components/UserListComponent');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'angular-auth-app',
            templateUrl: './templates/app.html',
            directives: [router_1.ROUTER_DIRECTIVES, MenuComponent_1.MenuComponent, ErrorComponent_1.ErrorComponent, HomeComponent_1.HomeComponent, LoginComponent_1.LoginComponent, UserListComponent_1.UserListComponent],
            providers: [router_1.ROUTER_PROVIDERS]
        }),
        router_1.RouteConfig([
            {
                path: '/home',
                name: 'Home',
                component: HomeComponent_1.HomeComponent,
                useAsDefault: true
            },
            {
                path: '/login',
                name: 'Login',
                component: LoginComponent_1.LoginComponent
            },
            {
                path: '/register',
                name: 'Register',
                component: RegisterComponent_1.RegisterComponent
            },
            {
                path: '/userList',
                name: 'UserList',
                component: UserListComponent_1.UserListComponent
            }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
