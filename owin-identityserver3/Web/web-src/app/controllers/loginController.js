'use strict';

(function () {
    var loginController = function ($scope, $location, authService) {

        var reset = function () {
            $scope.message = "";
        };
        reset();

        $scope.loginData = {
            userName: "",
            password: ""
        };

        $scope.login = function () {
            reset();
            authService.login($scope.loginData)
                .then(function() {
                    $location.path('/user');
                }).catch(function (err) {
                    $scope.message = err.error;
                });
        };
    };

    var app = angular.module('AngularAuthApp');
    app.controller('loginController', ['$scope', '$location', 'authService', loginController]);
})();