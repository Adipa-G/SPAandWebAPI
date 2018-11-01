//use strict
var app = angular.module('AngularAuthApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ngFormValidator', 'ui.bootstrap']);

app.config(function ($routeProvider) {

    var viewRoot = 'app/views/';

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: viewRoot + "home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: viewRoot + "login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: viewRoot + "signup.html"
    });

    $routeProvider.when("/user", {
        controller: "userController",
        templateUrl: viewRoot + "user.html"
    });

    $routeProvider.when("/logMessage", {
        controller: "logMessageController",
        templateUrl: viewRoot + "logmessage.html"
    });

    $routeProvider.when("/logHttp", {
        controller: "logHttpController",
        templateUrl: viewRoot + "loghttp.html"
    });

    $routeProvider.otherwise({ redirectTo: "/login" });
});

var serviceBase = '';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');

    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);

