'use strict';

(function() {
    var app = angular.module('AngularAuthApp');
    app.directive('sortHeader', function ($compile) {
        var getTemplate = function (sortData, sortField, headerText) {
            var template = "<th>" + headerText;
            if (sortData && sortData.OrderField && sortField
                && sortData.OrderField.toLowerCase() === sortField.toLowerCase()) {
                if (sortData.OrderDirection === 'Asc') {
                    template += "<i class='pull-right fa fa-sort-alpha-asc'>";
                }
                if (sortData.OrderDirection === 'Desc') {
                    template += "<i class='pull-right fa fa-sort-alpha-desc'>";
                }
            }
            template += "</th>";
            return template;
        };

        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                function updateHeader() {
                    var sortData = scope.$eval(attrs['sortHeader']);
                    var sortField = attrs['sortField'];
                    var headerText = elem.text();

                    var el = $compile(getTemplate(sortData, sortField, headerText))(scope);
                    elem.html(el.html());
                };

                scope.$watchGroup([attrs['sortHeader'], attrs['sortHeader'] + '.OrderField'], function () {
                    updateHeader();
                });

                elem.on('click', function () {
                    var sortData = scope.$eval(attrs['sortHeader']);
                    sortData.OrderField = attrs['sortField'];

                    if (sortData.OrderDirection === 'None') {
                        sortData.OrderDirection = 'Asc';
                    } else if (sortData.OrderDirection === 'Asc') {
                        sortData.OrderDirection = 'Desc';
                    }
                    else {
                        sortData.OrderDirection = 'None';
                    }
                    updateHeader();
                    sortData.onChange();
                });

                updateHeader();
            }
        };
    });
})();