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
            var deferred = $q.defer();

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&client_id=default&client_secret=no-secret&scope=all";
            var headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

            $http.post(serviceBase + 'token', data, headers)
            .then(function (response) {
                localStorageService.set('authorizationData', { token: response.data.access_token, userName: loginData.userName });
                authentication.isAuth = true;
                authentication.userName = loginData.userName;
                deferred.resolve(authentication);
            }).catch(function (err) {
                $log.error(err);
                logOut();
                deferred.reject(err.data);
            });

            return deferred.promise;
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