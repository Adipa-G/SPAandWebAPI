'use strict';

(function () {
    var logServiceFactory = function ($http, $log, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;

        var getLogLevels = function () {
            return $http.get(serviceBase + 'api/log/levels').catch(function (err) {
                $log.error(err);
            });
        };

        var getLoggers = function () {
            return $http.get(serviceBase + 'api/log/loggers').catch(function (err) {
                $log.error(err);
            });
        };

        var getLogMessages = function (sortAndPage) {
            return $http.post(serviceBase + 'api/log/logMessages', sortAndPage).catch(function (err) {
                $log.error(err);
            });
        };

        var getLogHttp = function (sortAndPage) {
            return $http.post(serviceBase + 'api/log/logHttp', sortAndPage).catch(function (err) {
                $log.error(err);
            });
        };

        return {
            getLogLevels: getLogLevels,
            getLoggers: getLoggers,
            getLogMessages: getLogMessages,
            getLogHttp: getLogHttp
        }
    };

    var app = angular.module('AngularAuthApp');
    app.factory('logService', ['$http','$log', 'ngAuthSettings', logServiceFactory]);
})();