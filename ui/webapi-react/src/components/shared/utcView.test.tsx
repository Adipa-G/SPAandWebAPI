import moment from 'moment';
import { render, screen } from '@testing-library/react';

import { UtcView } from "./utcView";

test('render local time', () => {
    var time = moment();
    var utc = time.clone().utc();

    render(<UtcView dateTime={utc.format()} />);

    const timeElement = screen.getByText(time.format("YYYY-MM-DD HH:mm:ss"));

    expect(timeElement).toBeInTheDocument();
});