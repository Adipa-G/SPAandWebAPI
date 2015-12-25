'use strict';

(function () {
    var userServiceFactory = function ($http, $log, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;

        var getUsers = function (sortAndPage) {
            return $http.post(serviceBase + 'api/Account/list', sortAndPage).catch(function (err) {
                $log.error(err);
            });
        };

        var deleteUser = function (userName) {
            return $http.delete(serviceBase + 'api/Account/delete/' + userName).catch(function (err) {
                $log.error(err);
            });
        };

        return {
            getUsers: getUsers,
            deleteUser: deleteUser
        }
    };

    var app = angular.module('AngularAuthApp');
    app.factory('userService', ['$http','$log', 'ngAuthSettings', userServiceFactory]);
})();