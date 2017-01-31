'use strict';

describe('login controller test', function () {
    var scope;
    var $controller;
    var $location;
    var authServiceObj;
    
    beforeEach(function () {
        module('AngularAuthApp');
    });

    beforeEach(inject(function ($rootScope, _$controller_, _$location_, _authService_) {
        scope = $rootScope.$new();
        $controller = _$controller_;
        $location = _$location_;
        authServiceObj = _authService_;
    }));

    it('login success go to updateMessages', function () {
        spyOn(authServiceObj, 'login').and.returnValue({
            then : function (sucF) {
                sucF();
            }
        });
        spyOn($location, 'path').and.callThrough();

        $controller('loginController', { $scope: scope, $location: $location, authService: authServiceObj });
        scope.login();

        expect($location.path).toHaveBeenCalledWith('/user');
        expect(scope.message).toBe('');
    });

    it('login failed set error', function () {
        spyOn(authServiceObj, 'login').and.returnValue({
            then: function (sucF,errF) {
                errF({error_description : 'Err'});
            }
        });

        $controller('loginController', { $scope: scope, $location: $location, authService: authServiceObj });
        scope.login();

        expect(scope.message).toBe('Err');
    });
});