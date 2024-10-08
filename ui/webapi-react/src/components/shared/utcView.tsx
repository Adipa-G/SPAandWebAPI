import moment from 'moment';
import * as React from "react";

export interface UtcViewProps { dateTime: string }

export interface UtcViewState { }

export class UtcView extends React.Component<UtcViewProps, UtcViewState> {

    constructor(props: UtcViewProps) {
        super(props);

        this.state = {};
    }

    render() {
        var localTime = moment.utc(this.props.dateTime).toDate();
        var localTimeStr = moment(localTime).format('YYYY-MM-DD HH:mm:ss');

        return <span>{localTimeStr}</span>;
    }
}