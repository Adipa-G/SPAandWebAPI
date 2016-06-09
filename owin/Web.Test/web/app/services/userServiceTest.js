'use strict';

describe('user service test', function () {
    var $http;
    var $log;
    var userServiceObj;

    beforeEach(function () {
        module('AngularAuthApp');
    });

    beforeEach(inject(function (_$http_,_$log_,_userService_) {
        $http = _$http_;
        $log = _$log_;
        userServiceObj = _userService_;
    }));

    it('get Users call post', function () {
        spyOn($http, 'post').and.callThrough();

        userServiceObj.getUsers();

        expect($http.post).toHaveBeenCalled();
    });

    it('delete User call delete', function () {
        spyOn($http, 'delete').and.callThrough();

        userServiceObj.deleteUser('user name');

        expect($http.delete).toHaveBeenCalled();
    });
});