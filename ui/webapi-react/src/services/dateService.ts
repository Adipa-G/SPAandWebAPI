declare var moment: any;

export class DateService {

    dateToUtcFormat = (date: string, format?: string) => {
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