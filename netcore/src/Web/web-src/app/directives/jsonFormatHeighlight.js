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

                    var fixedStr = value.replace(/Bearer [^\s]*/g, "Bearer (token)");

                    try {
                        var formatted = vkbeautify.json(fixedStr);
                        var highlighted = hljs.highlight('JSON', formatted);
                        elem.html('<pre>' + highlighted.value + '</pre>');    
                    }
                    catch(e1) {
                        try {
                            var result = '';
                            var level = 0;

                            for (var i = 0; i < fixedStr.length; i++) {
                                var chr = fixedStr[i];
                                if (['{', '['].indexOf(chr) >= 0) {
                                    level++;
                                }
                                if (['}', ']'].indexOf(chr) >= 0) {
                                    level--;
                                }
                                if (['{', '}', '[', ']', ','].indexOf(chr) >= 0) {
                                    result += '\n';
                                    result += ' '.repeat(level);
                                }
                                result += chr;
                            }
                            elem.html('<pre>' + result + '</pre>');
                        } catch (e2) {
                            elem.html(fixedStr);
                        }
                    }
                });
            }
        };
    });
})();