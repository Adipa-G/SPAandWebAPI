
var app = angular.module('AngularAuthApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ngFormValidator', 'ui.bootstrap']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "app/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "app/views/signup.html"
    });

    $routeProvider.when("/user", {
        controller: "userController",
        templateUrl: "app/views/user.html"
    });

    $routeProvider.when("/logMessage", {
        controller: "logMessageController",
        templateUrl: "app/views/logmessage.html"
    });

    $routeProvider.when("/logHttp", {
        controller: "logHttpController",
        templateUrl: "app/views/loghttp.html"
    });

    $routeProvider.when("/updateMessages", {
        controller: "messagesController",
        templateUrl: "app/views/messages.html",
        messageType : '1'
    });
    
    $routeProvider.when("/masterDataMessages", {
        controller: "messagesController",
        templateUrl: "app/views/messages.html",
        messageType: '2'
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

