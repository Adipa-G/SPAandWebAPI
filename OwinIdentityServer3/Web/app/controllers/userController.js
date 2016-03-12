'use strict';

(function () {
    var userController = function ($scope,$window, userService) {
        $scope.users = [];
        $scope.sortAndPage = { OrderField: 'UserName', OrderDirection: 'Asc', PageNumber: 1, PageSize: 10 };

        var populateData = function() {
            userService.getUsers($scope.sortAndPage).then(function (results) {
                $scope.users = results.data.results;
                $scope.sortAndPage.totalCount = results.data.totalCount;
            });
        };
        populateData();
        $scope.sortAndPage.onChange = populateData; 

        $scope.deleteUser = function (userName) {
            if ($window.confirm("Are you sure you want to delete this user?")) {
                userService.deleteUser(userName).then(function () {
                    for (var i = 0; i < $scope.users.length; i++) {
                        if ($scope.users[i].userName === userName) {
                            $scope.users.splice(i, 1);
                            break;
                        }
                    }
                });
            };
        };
    };

    var app = angular.module('AngularAuthApp');
    app.controller('userController', ['$scope','$window', 'userService', userController]);
})();