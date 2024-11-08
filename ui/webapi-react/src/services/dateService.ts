import moment from 'moment';

export class DateService {
    dateToUtcFormat = (date: string | Date, format?: string) => {
        if (date == null || date === '')
            return '';

        var mDate: any;
        if (format == null || format === '') {
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
}