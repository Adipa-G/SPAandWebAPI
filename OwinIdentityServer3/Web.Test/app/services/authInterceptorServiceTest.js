'use strict';

describe('auth interceptor service test', function () {
    var $q;
    var $rootScope;
    var $location;
    var $localStorageService;
    var $authService;
    var $authInterceptorService;

    beforeEach(function () {
        module('AngularAuthApp');
    });

    beforeEach(inject(function (_$q_, _$rootScope_, _$location_, _localStorageService_, _authService_, _authInterceptorService_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        $localStorageService = _localStorageService_;
        $authService = _authService_;
        $authInterceptorService = _authInterceptorService_;
    }));

    it('should set bearer token in the header', function () {
        var authData = { token: 'testToken' };

        $localStorageService.get = function () {
            return authData;
        };

        var request = {};
        $authInterceptorService.request(request);

        expect(request.headers.Authorization).toBe('Bearer ' + authData.token);
    });

    it('logout when auth is rejected', function () {
        spyOn($authService, 'logOut').and.callThrough();
        spyOn($location, 'path').and.callThrough();
        spyOn($q, 'reject').and.callThrough();

        $authInterceptorService.responseError({ status: 401 });

        expect($authService.logOut).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalled();
        expect($q.reject).toHaveBeenCalled();
    });

    it('not 401 then broadcast rootscope', function () {
        spyOn($rootScope, '$broadcast').and.callThrough();

        $authInterceptorService.responseError({ status: 500, headers: function(text) { return 'abc' } });

        expect($rootScope.$broadcast).toHaveBeenCalled();
    });
});