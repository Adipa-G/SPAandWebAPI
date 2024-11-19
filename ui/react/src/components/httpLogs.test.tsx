import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { CallbackFunction } from '../services/serviceModels';
import { HttpLogEntry, HttpLogFilter } from '../services/logService';
import HttpLogs from './httpLogs'

const mockGetLevels = jest.fn();
const mockGetHttpLogs = jest.fn();
jest.mock('../services/logService', () => {
    return {
        LogService: function () {

            return {
                getLevels: mockGetLevels,
                getHttpLogs: mockGetHttpLogs
            };
        }
    }
});

beforeEach(() => {
    const levels = ['Info', 'Error'];
    const logEntries: HttpLogEntry[] = [{
        id: 1,
        trackingId: 'a-track',
        logTimestamp: '2024-10-24T11:33:00',
        caller: 'C.Henderson',
        request: 'req.1',
        verb: 'GET',
        requestUri: 'http://localhost/api/users',
        requestHeaders: 'Accept: text/json',
        status: '200 OK',
        response: '{users : [{id : 1}]}',
        responseHeaders: 'Content-Length: 231',
        duration: '00:00:03'
    },
    {
        id: 2,
        trackingId: 'b-track',
        logTimestamp: '2024-10-25T11:33:00',
        caller: 'D.Henderson',
        request: 'req.2',
        verb: 'GET',
        requestUri: 'http://localhost/api/users',
        requestHeaders: 'Accept: text/json',
        status: '200 OK',
        response: '{users : [{id : 1}]}',
        responseHeaders: 'Content-Length: 231',
        duration: '00:00:03'
    }];

    mockGetLevels.mockImplementation((callback: CallbackFunction<string[]>) => callback({ data: levels, success: true, totalCount: 2, error: '' }));
    mockGetHttpLogs.mockImplementation((filter: HttpLogFilter, callback: CallbackFunction<HttpLogEntry[]>) => callback({ data: logEntries, success: true, totalCount: 2, error: '' }));
});

test('set log levels success', async () => {
    render(<HttpLogs />);

    let options = screen.getAllByTestId('logLevel-option')

    expect(options.length).toBe(2);
    expect(options[0].textContent).toBe('Info')
    expect(options[1].textContent).toBe('Error')
});

test('set log levels error', async () => {
    mockGetLevels.mockImplementation((callback: CallbackFunction<string[]>) => callback({ data: [], success: false, totalCount: 0, error: 'log level error' }));

    render(<HttpLogs />);

    let error = screen.getByText('log level error');

    expect(error).toHaveClass('alert-danger');
});

test('load log entries success', async () => {
    render(<HttpLogs />);

    let rows = screen.getAllByTestId('log-row')

    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('a-track')
    expect(rows[1].textContent).toContain('b-track')
});

test('load log entries render', async () => {
    const logEntries: HttpLogEntry[] = [{
        id: 1,
        logTimestamp: '2010-05-05T23:59:00',
        trackingId: '__trackingId__',
        caller: '__caller__',
        status: '__status__',
        duration: '__duration__',
        verb: '__verb__',
        requestUri: '__requestUri__',
        request: '__request__',
        response: '__response__',
        requestHeaders: '__requestHeaders__',
        responseHeaders: '__responseHeaders__'
    }];

    mockGetHttpLogs.mockImplementation((filter: HttpLogFilter, callback: CallbackFunction<HttpLogEntry[]>) => callback({ data: logEntries, success: true, totalCount: 0, error: '' }));

    render(<HttpLogs />);

    let rows = screen.getAllByTestId('log-row')

    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('__trackingId__');
    expect(rows[0].textContent).toContain('__caller__');
    expect(rows[0].textContent).toContain('__status__');
    expect(rows[0].textContent).toContain('__duration__');
    expect(rows[0].textContent).toContain('__verb__');
    expect(rows[0].textContent).toContain('__requestUri__');
    expect(rows[0].textContent).toContain('__request__');
    expect(rows[0].textContent).toContain('__response__');
    expect(rows[0].textContent).toContain('__requestHeaders__');
    expect(rows[0].textContent).toContain('__responseHeaders__');
});

test('load log entries error', async () => {
    mockGetHttpLogs.mockImplementation((filter: HttpLogFilter, callback: CallbackFunction<HttpLogEntry[]>) => callback({ data: [], success: false, totalCount: 0, error: 'logs error' }));

    render(<HttpLogs />);

    let error = screen.getByText('logs error');

    expect(error).toHaveClass('alert-danger');
});


test('fetch data when sorted', async () => {
    render(<HttpLogs />);

    let timeHeader = screen.getByText('Time');
    fireEvent.click(timeHeader);

    expect(mockGetHttpLogs).toBeCalledTimes(2);
});

test('fetch data when log level changed', async () => {
    render(<HttpLogs />);

    let logLevelSelect = screen.getByTestId('logLevel');
    fireEvent.change(logLevelSelect, { target: { value: 'Info' } });

    expect(mockGetHttpLogs).toBeCalledTimes(2);
});

test('fetch data when tracking id changed', async () => {
    render(<HttpLogs />);

    let trackingIdInput = screen.getByTestId('trackingId');
    fireEvent.change(trackingIdInput, { target: { value: '23' } });

    expect(mockGetHttpLogs).toBeCalledTimes(2);
});

test('fetch data when from date changed', async () => {
    let logs = render(<HttpLogs />);

    let fromDateInput = logs.container.querySelector('#fromDate')!;
    fireEvent.change(fromDateInput, { target: { value: '2020-03-07' } });

    expect(mockGetHttpLogs).toBeCalledTimes(2);
});

test('fetch data when to date changed', async () => {
    let logs = render(<HttpLogs />);

    let toDateInput = logs.container.querySelector('#toDate')!;
    fireEvent.change(toDateInput, { target: { value: '2020-03-09' } });

    expect(mockGetHttpLogs).toBeCalledTimes(2);
});