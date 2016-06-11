'use strict';

describe('user controller test', function () {
    var scope;
    var $controller;
    var $window;
    var userService;
    
    beforeEach(function () {
        module('AngularAuthApp');
    });

    beforeEach(inject(function (_$rootScope_, _$controller_,_$window_,_userService_) {
        scope = _$rootScope_.$new();
        $controller = _$controller_;
        $window = _$window_;
        userService = _userService_;
    }));

    it('load controller call user service success', function () {
        scope.sortAndPage = {};
        spyOn(userService, 'getUsers').and.returnValue({
            then: function (sucF) {
                sucF({ data: { results: [{ userName: 'u1' }, { userName: 'u2' }] , totalCount : 2 }});
            }
        });
 
        $controller('userController', { $scope: scope, userService: userService });
 
        expect(userService.getUsers).toHaveBeenCalled();
        expect(scope.users.length).toBe(2);
        expect(scope.sortAndPage.totalCount).toBe(2);
    });

    it('deleteUser call user service success remove user', function () {
        spyOn($window, 'confirm').and.returnValue(true);
        spyOn(userService, 'deleteUser').and.returnValue({
            then: function (sucF) {
                sucF();
            }
        });

        $controller('userController', { $scope: scope, userService: userService });
        scope.users = [{ userName: 'u1' }, { userName: 'u2' }];
        scope.deleteUser('u1');

        expect(userService.deleteUser).toHaveBeenCalled();
        expect(scope.users.length).toBe(1);
    });
});