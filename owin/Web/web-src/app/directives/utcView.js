'use strict';

(function () {
    var app = angular.module('AngularAuthApp');
    app.directive('utcView', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                attrs.$observe('utcView', function (value) {
                    var localTime = moment.utc(value).toDate();
                    localTime = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
                    elem.text(localTime);
                });
            }
        };
    });
})();