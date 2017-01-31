'use strict';

describe('signup controller test', function () {
    var scope;
    var $location;
    var authService;
    var $timeout;
    var $controller;

    beforeEach(function () {
        module('AngularAuthApp');
    });

    beforeEach(inject(function (_$rootScope_, _$controller_, _$location_,_$timeout_, _authService_) {
        scope = _$rootScope_.$new();
        $controller = _$controller_;
        $location = _$location_;
        $timeout = _$timeout_;
        authService = _authService_;
    }));

    it('signup call auth service success', function () {
        spyOn(authService, 'saveRegistration').and.returnValue({
            then: function (sucF) {
                sucF();
            }
        });
        spyOn($location, 'path').and.callThrough();

        $controller('signupController', { $scope: scope, $location: $location, authService: authService, $timeout: $timeout });
        scope.signUp({});

        expect(scope.savedSuccessfully).toBe(true);
    });

    it('signup call auth service error', function () {
        spyOn(authService, 'saveRegistration').and.returnValue({
            then: function (sucF,errF) {
                errF({ data: { modelState: [] } });
            }
        });
        spyOn($location, 'path').and.callThrough();

        $controller('signupController', { $scope: scope, $location: $location, authService: authService, $timeout: $timeout });
        scope.signUp({});

        expect(scope.savedSuccessfully).toBe(false);
    });
});