import { useState, useEffect, useMemo } from "react";

import DatePicker from "react-datepicker";

import { SystemLogEntry, SystemLogFilter, LogService } from "../services/logService"
import { DateService } from "../services/dateService"

import ErrorMessage from "./shared/errorMessage";
import TablePager from "./shared/tablePager";
import SortHeader from "./shared/sortHeader";
import UtcView from "./shared/utcView";

export interface SystemLogsProps {
    defaultPageSize: number
}

const SystemLogs = (props: SystemLogsProps) => {
    const dateService = useMemo(() => new DateService(), []);
    const logService = useMemo(() => new LogService(), []);

    const [errorMessage, setErrorMessage] = useState('');
    const [levels, setLevels] = useState<string[]>([]);
    const [loggerNames, setLoggerNames] = useState<string[]>([]);
    const [logs, setLogs] = useState<SystemLogEntry[]>();
    const [totalCount, setTotalCount] = useState(0);
    const [orderDirection, setOrderDirection] = useState('Desc');
    const [orderField, setOrderField] = useState('LogTimestamp');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(props.defaultPageSize);
    const [logLevel, setLogLevel] = useState<string>('');
    const [loggerName, setLoggerName] = useState<string>('');
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);

    const filter: SystemLogFilter = useMemo(() => {
        return {
            orderField: orderField,
            orderDirection: orderDirection,
            pageNumber: pageNumber,
            pageSize: pageSize,
            logger: loggerName,
            logLevel: logLevel,
            fromDate: fromDate != null ? dateService.dateToUtcFormat(fromDate) : null,
            toDate: toDate != null ? dateService.dateToUtcFormat(toDate) : null
        }
    }, [orderField, orderDirection, pageNumber, pageSize, loggerName, logLevel, fromDate, toDate, dateService]);

    useEffect(() => {
        logService.getLevels((levelResult) => {
            if (levelResult.success) {
                setLevels(levelResult.data);
            }
            else {
                setErrorMessage(levelResult.error);
            }
        });

        logService.getLoggers((loggersResult) => {
            if (loggersResult.success) {
                setLoggerNames(loggersResult.data);
            }
            else {
                setErrorMessage(loggersResult.error);
            }
        });
    }, [logService])

    const orderChanged = () => {
        if (filter.orderField !== orderField) {
            setOrderField(filter.orderField);
        }
        if (filter.orderDirection !== orderDirection) {
            setOrderDirection(filter.orderDirection);
        }
    };

    const pageChanged = () => {
        if (filter.pageNumber !== pageNumber) {
            setPageNumber(filter.pageNumber);
        }
    };

    useEffect(() => {
        filter.orderField = orderField;
        filter.orderDirection = orderDirection;
        filter.pageNumber = pageNumber;
        filter.pageSize = pageSize;
        filter.logger = loggerName;
        filter.logLevel = logLevel;
        filter.fromDate = fromDate != null ? dateService.dateToUtcFormat(fromDate) : null;
        filter.toDate = toDate != null ? dateService.dateToUtcFormat(toDate) : null;

        logService.getSystemLogs(filter, (logResult) => {
            if (logResult.success) {
                setLogs(logResult.data);
                setTotalCount(logResult.totalCount);
            }
            else {
                setErrorMessage(logResult.error);
            }
        });
    }, [fromDate, toDate, logLevel, loggerName, pageSize, pageNumber, orderField, orderDirection, dateService, filter, logService]);

    return (
        <div id="http-log">
            <div className="row">
                <div className="col-md-4 col-md-offset-2">
                    <div className="form-group">
                        <label>Level</label>
                        <select className="form-control"
                            id="logLevel"
                            data-testid="logLevel"
                            onChange={(e) => setLogLevel(e.currentTarget.value)}>
                            <option value="">Select</option>
                            {levels.map((level, index) => <option key={index} value={level} data-testid="logLevel-option">{level}</option>)}
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Logger Name</label>
                        <select className="form-control"
                            id="loggerName"
                            data-testid="loggerName"
                            onChange={(e) => setLoggerName(e.currentTarget.value)}>
                            <option value="">Select</option>
                            {loggerNames.map((loggerName, index) => <option key={index} value={loggerName} data-testid="loggerName-option">{loggerName}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-md-offset-2">
                    <label>Date Range</label>
                    <div className="input-group" id="fromDateGroup">
                        <DatePicker
                            className="form-control"
                            dateFormat="yyyy-MM-dd"
                            selected={fromDate}
                            showIcon
                            id="fromDate"
                            onChange={(date) => setFromDate(date)}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <label>&nbsp;</label>
                    <div className="input-group" id="toDateGroup">
                        <DatePicker
                            className="form-control"
                            dateFormat="yyyy-MM-dd"
                            selected={toDate}
                            showIcon
                            id="toDate"
                            onChange={(date) => setToDate(date)}
                        />
                    </div>
                </div>
            </div>
            <div className="row top-margin-lg">
                <div className="col-md-8 col-md-offset-2">
                    <table className="table table-striped table-bordered table-hover table-responsive">
                        <thead>
                            <tr>
                                <SortHeader
                                    headerText="Time"
                                    orderData={filter}
                                    orderField="LogTimestamp"
                                    orderChanged={() => orderChanged()} />
                                <SortHeader
                                    headerText="Logger"
                                    orderData={filter}
                                    orderField="Logger"
                                    orderChanged={() => orderChanged()} />
                                <SortHeader
                                    headerText="Level"
                                    orderData={filter}
                                    orderField="Level"
                                    orderChanged={() => orderChanged()} />
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(logs || []).map((log, i) => {
                                let details: Array<any> = [];
                                if (log.message) {
                                    details.push(<dl key="MsgLabel{i}">Message</dl>);
                                    details.push(<dt key="Msg{i}">{log.message}</dt>);
                                }
                                if (log.stackTrace) {
                                    details.push(<dl key="'StackLabel{i}">Stacktrace</dl>);
                                    details.push(<dt key="'Stack{i}">{log.stackTrace}</dt>);
                                }

                                return (
                                    <tr key={i} data-testid='log-row'>
                                        <td><UtcView dateTime={log.logTimestamp}></UtcView> </td>
                                        <td>{log.logger}</td>
                                        <td>{log.level}</td>
                                        <td>
                                            <dl className="dl-horizontal">
                                                {details}
                                            </dl>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <TablePager
                        totalCount={totalCount}
                        pageData={filter}
                        pageChanged={() => pageChanged()} />
                    <ErrorMessage errorMessage={errorMessage} />
                </div>
            </div>
        </div>
    );
}

export default SystemLogs;