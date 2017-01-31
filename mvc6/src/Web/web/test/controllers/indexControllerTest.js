'use strict';

describe('index controller test', function () {
    var scope;
    var $controller;
    var $location;
    var authServiceObj;    

    beforeEach(function () {
        module('AngularAuthApp');
    });

    beforeEach(inject(function (_$rootScope_, _$controller_, _$location_, _authService_) {
        scope = _$rootScope_.$new();
        $controller = _$controller_;
        $location = _$location_;
        authServiceObj = _authService_;
    }));

    it('logout call auth service and redirect home', function () {
        spyOn(authServiceObj, 'logOut').and.callThrough();
        spyOn($location, 'path').and.callThrough();

        $controller('indexController', { $scope: scope, $location: $location, authService: authServiceObj });
        scope.logOut();

        expect(authServiceObj.logOut).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith('/home');
    });

    it('is logged on redirect update messages', function () {
        spyOn($location, 'path').and.callThrough();

        authServiceObj.authentication = { isAuth: true };
        $controller('indexController', { $scope: scope, $location: $location, authService: authServiceObj });

        expect($location.path).toHaveBeenCalledWith('/user');
    });

    it('is logged off redirect logon', function () {
        spyOn($location, 'path').and.callThrough();

        authServiceObj.authentication = { isAuth: false };
        $controller('indexController', { $scope: scope, $location: $location, authService: authServiceObj });

        expect($location.path).toHaveBeenCalledWith('/login');
    });
});