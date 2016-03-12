'use strict';

(function () {
    var authInterceptorService = function ($rootScope,$q, $location, $injector, localStorageService) {

        var request = function (config) {
            config.headers = config.headers || {};
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }
            return config;
        }

        var responseError = function(rejection) {
            if (rejection.status === 401) {
                var authService = $injector.get('authService');
                authService.logOut();
                $location.path('/login');
            } else {
                var erroDetail = {
                    message: 'Unknown error, please use the error code ['
                        + rejection.headers('Http-Tracking-Id')
                        + '] to diagnose'
                };
                $rootScope.$broadcast('errorOccured', erroDetail);
            }
            return $q.reject(rejection);
        }

        return {
            request: request,
            responseError: responseError
        };
    };

    var app = angular.module('AngularAuthApp');
    app.factory('authInterceptorService', ['$rootScope','$q', '$location', '$injector', 'localStorageService', authInterceptorService]);
})();