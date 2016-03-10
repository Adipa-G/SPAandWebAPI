'use strict';

describe('log service test', function () {
    var $http;
    var $log;
    var logServiceObj;

    beforeEach(function () {
        module('AngularAuthApp');
    });

    beforeEach(inject(function (_$http_, _$log_, _logService_) {
        $http = _$http_;
        $log = _$log_;
        logServiceObj = _logService_;
    }));

    it('getLogLevels call get', function () {
        spyOn($http, 'get').and.callThrough();

        logServiceObj.getLogLevels();

        expect($http.get).toHaveBeenCalled();
    });

    it('getLoggers call get', function () {
        spyOn($http, 'get').and.callThrough();

        logServiceObj.getLoggers();

        expect($http.get).toHaveBeenCalled();
    });

    it('getLogMessages call post', function() {
        spyOn($http, 'post').and.callThrough();

        logServiceObj.getLogMessages({});

        expect($http.post).toHaveBeenCalled();
    });

    it('getLogHttp call post', function () {
        spyOn($http, 'post').and.callThrough();

        logServiceObj.getLogHttp({});

        expect($http.post).toHaveBeenCalled();
    });
});