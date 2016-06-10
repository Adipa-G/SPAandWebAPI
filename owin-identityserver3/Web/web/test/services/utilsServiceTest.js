'use strict';

describe('utils service test', function () {
    var utilsService;

    beforeEach(function () {
        module('AngularAuthApp');
    });

    beforeEach(inject(function (_utilsService_) {
        utilsService = _utilsService_;
    }));

    it('convert string date', function () {
        var result = utilsService.dateToUtcFormat('2012-09-11','YYYY-MM-DD');
        expect(result).toBe('2012-09-10T14:00:00');
    });

    it('convert string date', function () {
        var result = utilsService.dateToUtcFormat(moment('2012-09-11', 'YYYY-MM-DD'));
        expect(result).toBe('2012-09-10T14:00:00');
    });

    it('convert date format error', function () {
        var result = utilsService.dateToUtcFormat('2012-09-51', 'YYYY-MM-DD');
        expect(result).toBe('');
    });

    it('convert date format undefined', function () {
        var result = utilsService.dateToUtcFormat(undefined, undefined);
        expect(result).toBe('');
    });
});