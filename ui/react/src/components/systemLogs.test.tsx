import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { CallbackFunction } from '../services/serviceModels';
import { SystemLogEntry, SystemLogFilter } from '../services/logService';
import SystemLogs from './systemLogs'

const mockGetLevels = jest.fn();
const mockGetLoggerNames = jest.fn();
const mockGetSystemLogs = jest.fn();
jest.mock('../services/logService', () => {
    return {
        LogService: function () {

            return {
                getLevels: mockGetLevels,
                getLoggers: mockGetLoggerNames,
                getSystemLogs: mockGetSystemLogs
            };
        }
    }
});

beforeEach(() => {
    const levels = ['Info', 'Error'];
    const loggerNames = ['General', 'SQL'];
    const logEntries: SystemLogEntry[] = [{
        id: 1,
        logTimestamp: '2024-10-24T11:33:00',
        logger: 'SQL',
        level: 'Error',
        message: 'A',
        stackTrace: ''
    },
    {
        id: 1,
        logTimestamp: '2024-10-24T11:33:00',
        logger: 'SQL',
        level: 'Error',
        message: 'B',
        stackTrace: ''
    }];

    mockGetLevels.mockImplementation((callback: CallbackFunction<string[]>) => callback({ data: levels, success: true, totalCount: 2, error: '' }));
    mockGetLoggerNames.mockImplementation((callback: CallbackFunction<string[]>) => callback({ data: loggerNames, success: true, totalCount: 2, error: '' }));
    mockGetSystemLogs.mockImplementation((filter: SystemLogFilter, callback: CallbackFunction<SystemLogEntry[]>) => callback({ data: logEntries, success: true, totalCount: 2, error: '' }));
});

test('set log levels success', async () => {
    render(<SystemLogs defaultPageSize={100} />);

    let options = screen.getAllByTestId('logLevel-option')

    expect(options.length).toBe(2);
    expect(options[0].textContent).toBe('Info')
    expect(options[1].textContent).toBe('Error')
});

test('set log levels error', async () => {
    mockGetLevels.mockImplementation((callback: CallbackFunction<string[]>) => callback({ data: [], success: false, totalCount: 0, error: 'log level error' }));

    render(<SystemLogs defaultPageSize={100} />);

    let error = screen.getByText('log level error');

    expect(error).toHaveClass('alert-danger');
});

test('set logger names success', async () => {
    render(<SystemLogs defaultPageSize={100} />);

    let options = screen.getAllByTestId('loggerName-option')

    expect(options.length).toBe(2);
    expect(options[0].textContent).toBe('General')
    expect(options[1].textContent).toBe('SQL')
});

test('set logger names error', async () => {
    mockGetLoggerNames.mockImplementation((callback: CallbackFunction<string[]>) => callback({ data: [], success: false, totalCount: 0, error: 'logger name error' }));

    render(<SystemLogs defaultPageSize={100} />);

    let error = screen.getByText('logger name error');

    expect(error).toHaveClass('alert-danger');
});

test('load log entries success', async () => {
    render(<SystemLogs defaultPageSize={100} />);

    let rows = screen.getAllByTestId('log-row')

    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('A')
    expect(rows[1].textContent).toContain('B')
});

test('load log entries render', async () => {
    const logEntries: SystemLogEntry[] = [{
        id: 1,
        logTimestamp: '2010-05-05T23:59:00',
        logger: '__logger__',
        level: '__level__',
        message: '__message__',
        stackTrace: '__stackTrace__'
    }];

    mockGetSystemLogs.mockImplementation((filter: SystemLogFilter, callback: CallbackFunction<SystemLogEntry[]>) => callback({ data: logEntries, success: true, totalCount: 0, error: '' }));

    render(<SystemLogs defaultPageSize={100} />);

    let rows = screen.getAllByTestId('log-row')

    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('__logger__');
    expect(rows[0].textContent).toContain('__level__');
    expect(rows[0].textContent).toContain('__message__');
    expect(rows[0].textContent).toContain('__stackTrace__');
});

test('load log entries error', async () => {
    mockGetSystemLogs.mockImplementation((filter: SystemLogFilter, callback: CallbackFunction<SystemLogEntry[]>) => callback({ data: [], success: false, totalCount: 0, error: 'logs error' }));

    render(<SystemLogs defaultPageSize={100} />);

    let error = screen.getByText('logs error');

    expect(error).toHaveClass('alert-danger');
});

test('fetch data when sorted', async () => {
    render(<SystemLogs defaultPageSize={100} />);

    let timeHeader = screen.getByText('Time');
    fireEvent.click(timeHeader);

    expect(mockGetSystemLogs).toHaveBeenCalledTimes(2);
});

test('fetch data when paged', async () => {
    render(<SystemLogs defaultPageSize={1} />);

    let page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    expect(mockGetSystemLogs).toHaveBeenCalledTimes(2);
});

test('fetch data when log level changed', async () => {
    render(<SystemLogs defaultPageSize={100} />);

    let logLevelSelect = screen.getByTestId('logLevel');
    fireEvent.change(logLevelSelect, { target: { value: 'Info' } });

    expect(mockGetSystemLogs).toHaveBeenCalledTimes(2);
});

test('fetch data when logger name changed', async () => {
    render(<SystemLogs defaultPageSize={100} />);

    let loggerNameSelect = screen.getByTestId('loggerName');
    fireEvent.change(loggerNameSelect, { target: { value: 'SQL' } });

    expect(mockGetSystemLogs).toHaveBeenCalledTimes(2);
});

test('fetch data when from date changed', async () => {
    let logs = render(<SystemLogs defaultPageSize={100} />);

    let fromDateInput = logs.container.querySelector('#fromDate')!;
    fireEvent.change(fromDateInput, { target: { value: '2020-03-07' } });

    expect(mockGetSystemLogs).toHaveBeenCalledTimes(2);
});

test('fetch data when to date changed', async () => {
    let logs = render(<SystemLogs defaultPageSize={100} />);

    let toDateInput = logs.container.querySelector('#toDate')!;
    fireEvent.change(toDateInput, { target: { value: '2020-03-09' } });

    expect(mockGetSystemLogs).toHaveBeenCalledTimes(2);
});