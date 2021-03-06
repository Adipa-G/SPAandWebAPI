﻿'use strict';

(function () {
    var signupController = function ($scope, $location, $timeout, authService) {

        var reset = function () {
            $scope.savedSuccessfully = false;
            $scope.message = "";
            $scope.successMessagge = "";
        };
        reset();

        $scope.registration = {
            userName: "",
            password: "",
            confirmPassword: ""
        };

        $scope.signUp = function () {
            reset();
            authService.saveRegistration($scope.registration).then(function () {
                var startTimer = function () {
                    var timer = $timeout(function () {
                        $timeout.cancel(timer);
                        $location.path('/login');
                    }, 2000);
                };

                $scope.savedSuccessfully = true;
                $scope.successMessagge = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                startTimer();
            },
            function (response) {
                var errors = [];
                for (var key in response.data.modelState) {
                    if (response.data.modelState.hasOwnProperty(key)) {
                        for (var i = 0; i < response.data.modelState[key].length; i++) {
                            errors.push(response.data.modelState[key][i]);
                        }
                    }
                }
                $scope.message = "Failed to register user due to:" + errors.join(' ');
            });
        };
    };

    var app = angular.module('AngularAuthApp');
    app.controller('signupController', ['$scope', '$location', '$timeout', 'authService', signupController]);
})();