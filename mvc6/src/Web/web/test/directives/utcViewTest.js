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
        var element = $compile("<div utc-view=\"{{dateValue}}\"></div>")($rootScope);
        $rootScope.$digest();

        var scope = element.scope();
        scope.dateValue = '2015-12-22T10:58:02'; 
        scope.$digest();

        expect(element.html()).toContain("2015-12-22 21:58:02");
    });
});