'use strict';

(function () {
    var indexController = function ($scope, $location, authService) {

        $scope.logOut = function () {
            authService.logOut();
            $location.path('/home');
        };

        $scope.authentication = authService.authentication;

        if (authService.authentication.isAuth) {
            $location.path('/user');
        } else {
            $location.path('/login');
        }

    };

    var app = angular.module('AngularAuthApp');
    app.controller('indexController', ['$scope', '$location', 'authService', indexController]);
})();