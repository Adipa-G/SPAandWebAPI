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
        var element = $compile("<div json-format-heighlight=\"{{jsonText}}\"></div>")($rootScope);
        $rootScope.$digest();

        var scope = element.scope();
        scope.jsonText = '{"Test1" : "1", "Test2" : "2", "Test3" : "3" }';
        scope.$digest();

        expect(element.html()).toContain("Test1");
        expect(element.html()).toContain("Test2");
        expect(element.html()).toContain("Test3");
    });
});