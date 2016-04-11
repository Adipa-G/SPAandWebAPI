'use strict';

describe('sort header test', function () {
    var $compile;
    var $rootScope;

    beforeEach(module('AngularAuthApp'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Set the icon for ascending', function () {
        var element = $compile("<th sort-header='sortData' sort-field='UserName'>Username</th>")($rootScope);
        $rootScope.$digest();

        var scope = element.scope();
        scope.sortData = { OrderField: 'UserName', OrderDirection: 'Asc' };
        scope.$digest();

        expect(element.html()).toContain("fa-sort-alpha-asc");
    });

    it('Set the icon for descending', function () {
        var element = $compile("<th sort-header='sortData' sort-field='UserName'>Username</th>")($rootScope);
        $rootScope.$digest();

        var scope = element.scope();
        scope.sortData = { OrderField: 'UserName', OrderDirection: 'Desc' };
        scope.$digest();

        expect(element.html()).toContain("fa-sort-alpha-desc");
    });

    it('click switch icon and call onChange funtion', function () {
        var element = $compile("<th sort-header='sortData' sort-field='UserName'>Username</th>")($rootScope);
        $rootScope.$digest();

        var changed = false;
        
        var scope = element.scope();
        scope.sortData = { OrderField: 'UserName', OrderDirection: 'None', onChange : function () { changed = true; } };
        scope.$digest();

        element.triggerHandler('click');

        expect(element.html()).toContain("fa-sort-alpha-asc");
        expect(scope.sortData.OrderDirection).toBe('Asc');
        expect(changed).toBe(true);

        element.triggerHandler('click');

        expect(element.html()).toContain("fa-sort-alpha-desc");
        expect(scope.sortData.OrderDirection).toBe('Desc');

        element.triggerHandler('click');

        expect(scope.sortData.OrderDirection).toBe('None');
    });
});