import moment from 'moment';

export interface UtcViewProps { dateTime: string }

const UtcView = (props: UtcViewProps) => {
    const localTime = moment.utc(props.dateTime).toDate();
    const localTimeStr = moment(localTime).format('YYYY-MM-DD HH:mm:ss');

    return (
        <span>{localTimeStr}</span>
    );
};

export default UtcView;