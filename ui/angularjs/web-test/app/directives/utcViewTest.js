'use strict';

describe('utc view test', function () {
    var $compile;
    var $rootScope;

    beforeEach(module('AngularAuthApp'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Set utc to local', function () {
        function pad(val){
            if (('' + val).length == 1){
                return '0' + val;
            }
            return val;
        }

        var date = new Date();
        var utc = date.toISOString();
        var local = pad(date.getFullYear()) + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) 
            + " " + pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds());

        var element = $compile("<div utc-view=\"{{dateValue}}\"></div>")($rootScope);
        $rootScope.$digest();

        var scope = element.scope();
        scope.dateValue = utc; 
        scope.$digest();

        expect(element.html()).toContain(local);
    });
});