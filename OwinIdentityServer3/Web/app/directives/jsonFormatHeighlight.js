'use strict';

(function () {
    var app = angular.module('AngularAuthApp');
    app.directive('jsonFormatHeighlight', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                attrs.$observe('jsonFormatHeighlight', function (value) {
                    if (!value)
                        return;
                    try {
                        var formatted = vkbeautify.json(value);
                        var highlighted = hljs.highlight('JSON', formatted);
                        elem.html(highlighted.value);    
                    }
                    catch(e) {
                        elem.html(value);
                    }
                });
            }
        };
    });
})();