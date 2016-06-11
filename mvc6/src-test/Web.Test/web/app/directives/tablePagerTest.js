'use strict';

describe('table pager test', function () {
    var $compile;
    var $rootScope;

    beforeEach(module('AngularAuthApp'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Set pagination styles', function () {
        var element = $compile("<div table-pager=\"sortAndPage\"></div>")($rootScope);
        $rootScope.$digest();

        var scope = element.scope();
        scope.sortData = { OrderField: 'UserName', OrderDirection: 'Asc' };
        scope.$digest();

        expect(element.html()).toContain("pagination-sm");
    });

    it('Set show condition', function () {
        var element = $compile("<div table-pager=\"sortAndPage\"></div>")($rootScope);
        $rootScope.$digest();

        var scope = element.scope();
        scope.sortData = { OrderField: 'UserName', OrderDirection: 'Asc' };
        scope.$digest();

        expect(element.html()).toContain("sortAndPage.totalCount&gt;sortAndPage.PageSize");
    });

    it('Set total items count', function () {
        var element = $compile("<div table-pager=\"sortAndPage\"></div>")($rootScope);
        $rootScope.$digest();

        var scope = element.scope();
        scope.sortData = { OrderField: 'UserName', OrderDirection: 'Asc' };
        scope.$digest();

        expect(element.html()).toContain("total-items=\"sortAndPage.totalCount\"");
    });

    it('Set model', function () {
        var element = $compile("<div table-pager=\"sortAndPage\"></div>")($rootScope);
        $rootScope.$digest();

        var scope = element.scope();
        scope.sortData = { OrderField: 'UserName', OrderDirection: 'Asc' };
        scope.$digest();

        expect(element.html()).toContain("ng-model=\"sortAndPage.PageNumber\"");
    });

    it('Set items per page', function () {
        var element = $compile("<div table-pager=\"sortAndPage\"></div>")($rootScope);
        $rootScope.$digest();

        var scope = element.scope();
        scope.sortData = { OrderField: 'UserName', OrderDirection: 'Asc' };
        scope.$digest();

        expect(element.html()).toContain("items-per-page=\"sortAndPage.PageSize\"");
    });

    it('Set change event', function () {
        var element = $compile("<div table-pager=\"sortAndPage\"></div>")($rootScope);
        $rootScope.$digest();

        var scope = element.scope();
        scope.sortData = { OrderField: 'UserName', OrderDirection: 'Asc' };
        scope.$digest();

        expect(element.html()).toContain("ng-change=\"sortAndPage.onChange()\"");
    });
});