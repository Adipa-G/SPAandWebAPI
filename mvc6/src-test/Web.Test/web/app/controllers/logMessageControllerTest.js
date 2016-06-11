'use strict';

describe('log message controller test', function () {
    var scope;
    var $controller;
    var $q;
    var logService;
    var utilsService;
    
    beforeEach(function () {
        module('AngularAuthApp');
    });

    beforeEach(inject(function (_$rootScope_, _$controller_,_$q_,_logService_,_utilsService_) {
        scope = _$rootScope_.$new();
        $controller = _$controller_;
        $q = _$q_;
        logService = _logService_;
        utilsService = _utilsService_;
    }));

    it('load controller call log service populate levels', function () {
        spyOn(logService, 'getLogLevels').and.returnValue({
            then: function (sucF) {
                sucF({ data: ['Error', 'Debug', 'Info'] });
            }
        });
 
        $controller('logMessageController', { $scope: scope, logService: logService });
 
        expect(scope.logLevels.length).toBe(3);
    });

    it('load controller call log service populate loggers', function () {
        spyOn(logService, 'getLoggers').and.returnValue({
            then: function (sucF) {
                sucF({ data: ['SQL', 'General'] });
            }
        });

        $controller('logMessageController', { $scope: scope, logService: logService });

        expect(scope.loggers.length).toBe(2);
    });

    it('load controller call log service populate logs', function () {
        scope.filter = { _FromDate : 'x', _ToDate : 'y' };
        spyOn(utilsService, 'dateToUtcFormat').and.returnValue('test');
        spyOn(logService, 'getLogMessages').and.returnValue({
            then: function (sucF) {
                sucF({ data: { results: [{ Logger: 'u1' }, { Logger: 'u2' }], totalCount: 2 } });
            }
        });

        $controller('logMessageController', { $scope: scope, logService: logService });

        expect(utilsService.dateToUtcFormat).toHaveBeenCalled();
        expect(scope.filter.FromDate).toBe('test');
        expect(scope.filter.ToDate).toBe('test');
        expect(logService.getLogMessages).toHaveBeenCalled();
        expect(scope.logs.length).toBe(2);
        expect(scope.filter.totalCount).toBe(2);
    });

    it('toggleFromCalender show calendar', function () {
        $controller('logMessageController', { $scope: scope, logService: logService });
        scope.toggleFromCalender();

        expect(scope.showFromCalender).toBe(true);
    });

    it('toggleToCalender show calendar', function () {
        $controller('logMessageController', { $scope: scope, logService: logService });
        scope.toggleToCalender();

        expect(scope.showToCalender).toBe(true);
    });
});