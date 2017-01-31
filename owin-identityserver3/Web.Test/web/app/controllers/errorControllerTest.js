'use strict';

describe('error controller test', function () {
    var scope;
    var $rootscope;
    var $controller;

    beforeEach(function () {
        module('AngularAuthApp');
    });

    beforeEach(inject(function (_$rootScope_, _$controller_) {
        $rootscope = _$rootScope_;
        scope = _$rootScope_.$new();
        $controller = _$controller_;
    }));

    it('broadcast error on rootscope creates errors in errorController', function () {
        $controller('errorController', { $scope: scope, $rootscope: $rootscope });
        $rootscope.$broadcast('errorOccured',{message : '1'});

        expect(scope.errors.length).toBe(1);
    });
});