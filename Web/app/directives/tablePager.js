'use strict';

(function() {
    var app = angular.module('AngularAuthApp');
    app.directive('tablePager', function ($compile) {
        var getTemplate = function (sortData) {
            var template = '<uib-pagination class="pagination-sm top-margin-zero" ng-show="' + sortData + '.totalCount>' + sortData + '.PageSize" ' +
                'direction-links="true" boundary-links="true" total-items="' + sortData + '.totalCount" max-size="5" ' +
                'ng-model="' + sortData + '.PageNumber" items-per-page="' + sortData + '.PageSize" ' +
                'ng-change="' + sortData + '.onChange()"></uib-pagination>';
            return template;
        };

        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                function updatePager() {
                    var sortData = attrs['tablePager'];

                    elem.html(getTemplate(sortData));
                    $compile(elem.contents())(scope);
                };

                scope.$watchGroup([attrs['tablePager']], function () {
                    updatePager();
                });

                updatePager();
            }
        };
    });
})();