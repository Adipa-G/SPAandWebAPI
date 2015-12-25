'use strict';

(function() {
    var authServiceFactory = function ($http, $q, localStorageService, $log, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
     
        var authentication = {
            isAuth: false,
            userName: ""
        };

        var logOut = function() {
            localStorageService.remove('authorizationData');
            authentication.isAuth = false;
            authentication.userName = "";
        };

        var saveRegistration = function(registration) {
            logOut();
            return $http.post(serviceBase + 'api/account/register', registration).catch(function(err) {
                $log.error(err);
            });
        };

        var login = function (loginData) {
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
            var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

            return $http.post(serviceBase + 'token', data, headers)
            .then(function (response) {
                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });
                authentication.isAuth = true;
                authentication.userName = loginData.userName;

            }).catch(function (err) {
                $log.error(err);
                logOut();
            });
        };

        var fillAuthData = function() {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                authentication.isAuth = true;
                authentication.userName = authData.userName;
            }
        };

        return {
            saveRegistration : saveRegistration,
            login : login,
            logOut : logOut,
            fillAuthData : fillAuthData,
            authentication : authentication
        };
    };
    
    var app = angular.module('AngularAuthApp');
    app.factory('authService', ['$http', '$q', 'localStorageService', '$log', 'ngAuthSettings', authServiceFactory]);
})();