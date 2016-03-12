'use strict';

(function () {
    var utilsServiceFactory = function ($log) {

        var dateToUtcFormat = function (date, format) {
            if (date == null)
                return '';

            var mDate;
            if (format == null) {
                mDate = moment(date);
            } else {
                mDate = moment(date, format);
            }
            var result = mDate.utc().format('YYYY-MM-DDTHH:mm:ss');

            if (result === 'Invalid date') {
                return '';
            }
            return result;
        };

        return {
            dateToUtcFormat: dateToUtcFormat
        };
    };

    var app = angular.module('AngularAuthApp');
    app.factory('utilsService', ['$log',utilsServiceFactory]);
})();