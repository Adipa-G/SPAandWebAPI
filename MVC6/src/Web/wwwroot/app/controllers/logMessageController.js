'use strict';

(function () {
    var logMessageController = function ($scope, $q, logService, utilsService) {
        $scope.logs = [];
        $scope.showFromCalender = false;
        $scope.showToCalender = false;
        $scope.filter = { OrderField: 'LogTimestamp', OrderDirection: 'Desc', PageNumber: 1, PageSize: 100 };

        $scope.toggleFromCalender = function() {
            $scope.showFromCalender = !$scope.showFromCalender;
        };

        $scope.toggleToCalender = function () {
            $scope.showToCalender = !$scope.showToCalender;
        };

        var populateData = function () {
            $scope.filter.FromDate = utilsService.dateToUtcFormat($scope.filter._FromDate);
            $scope.filter.ToDate = utilsService.dateToUtcFormat($scope.filter._ToDate);

            $q.all([logService.getLogMessages($scope.filter).then(function (results) {
                $scope.logs = results.data.results;
                $scope.filter.totalCount = results.data.totalCount;
            }), logService.getLogLevels().then(function(results) {
                $scope.logLevels = results.data;
            }), logService.getLoggers().then(function (results) {
                $scope.loggers = results.data;
            })]);
        };
        populateData();
        $scope.filter.onChange = populateData;
    };

    var app = angular.module('AngularAuthApp');
    app.controller('logMessageController', ['$scope', '$q', 'logService', 'utilsService', logMessageController]);
})();