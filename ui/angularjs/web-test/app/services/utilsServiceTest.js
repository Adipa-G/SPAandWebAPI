'use strict';

describe('utils service test', function () {
    var utilsService;
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    var utc = date.toISOString().substring(0,19);
    var local = pad(date.getFullYear()) + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());

    function pad(val){
        if (('' + val).length == 1){
            return '0' + val;
        }
        return val;
    }

    beforeEach(function () {
        module('AngularAuthApp');
    });

    beforeEach(inject(function (_utilsService_) {
        utilsService = _utilsService_;
    }));

    it('convert string date', function () {
        var result = utilsService.dateToUtcFormat(local,'YYYY-MM-DD');
        expect(result).toBe(utc);
    });

    it('convert string date', function () {
        var result = utilsService.dateToUtcFormat(moment(local, 'YYYY-MM-DD'));
        expect(result).toBe(utc);
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