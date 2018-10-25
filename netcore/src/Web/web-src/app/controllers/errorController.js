'use strict';

(function () {
    var errorController = function ($rootScope, $scope) {
        $scope.errors = [];

        $rootScope.$on('errorOccured', function (evt,erroDetail) {
            $scope.errors.push(erroDetail);
        });
    };

    var app = angular.module('AngularAuthApp');
    app.controller('errorController', ['$rootScope', '$scope', errorController]);
})();