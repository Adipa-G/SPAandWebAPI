'use strict';

describe('auth service test', function () {
    var localStorageService;
    var $http;
    var $q;
    var logService;
    var authService;
    
    beforeEach(function () {
        module('AngularAuthApp');
    });

    beforeEach(inject(function (_$http_, _$q_, _$log_, _authService_, _localStorageService_) {
        $http = _$http_;
        $q = _$q_;
        logService = _$log_;
        authService = _authService_;
        localStorageService = _localStorageService_;
    }));

    it('logout remove auth data', function () {
        spyOn(localStorageService, 'remove').and.callThrough();

        authService.logOut();

        expect(localStorageService.remove).toHaveBeenCalled();
    });

    it('save registration calls http', function () {
        spyOn($http, 'post').and.returnValue({
            then: function () {
                return {success: true}
            },
            catch: function () {
            }
        });

        authService.saveRegistration({ user: 'aa', password: 'xx' });

        expect($http.post).toHaveBeenCalled();
    });

    it('login calls http success', function () {
        spyOn(localStorageService, 'set').and.callThrough();
        spyOn($http, 'post').and.returnValue({
            then : function (sucF) {
                sucF({ access_token: 'tkn' });
                return {
                    catch: function () {
                    }
                }
            }
        });

        authService.login({ userName: 'aa', password: 'xx' });

        expect(localStorageService.set).toHaveBeenCalled();
        expect($http.post).toHaveBeenCalled();
        expect(authService.authentication.isAuth).toBe(true);
        expect(authService.authentication.userName).toBe('aa');
    });

    it('login calls http error', function () {
        spyOn(localStorageService, 'remove').and.callThrough();
        spyOn($http, 'post').and.returnValue({
            then: function () {
                return {
                    catch: function (errF) {
                        errF();
                    }
                }
            }
        });
        spyOn(logService, 'error').and.callThrough();

        authService.login({ userName: 'aa', password: 'xx' });

        expect(localStorageService.remove).toHaveBeenCalled();
        expect($http.post).toHaveBeenCalled();
        expect(authService.authentication.isAuth).toBe(false);
        expect(authService.authentication.userName).toBe('');
        expect(logService.error).toHaveBeenCalled();
    });

    it('fill auth data sets auth data', function () {
        spyOn(localStorageService, 'get').and.returnValue({ userName: 'aa' });

        authService.fillAuthData();

        expect(authService.authentication.isAuth).toBe(true);
        expect(authService.authentication.userName).toBe('aa');
    });
});