import { useState, useEffect, useMemo } from "react";

import DatePicker from "react-datepicker";

import { HttpLogEntry, HttpLogFilter, LogService } from "../services/logService"
import { DateService } from "../services/dateService"

import ErrorMessage from "./shared/errorMessage";
import TablePager from "./shared/tablePager";
import SortHeader from "./shared/sortHeader";
import UtcView from "./shared/utcView";
import JsonFormatHeighlight from "./shared/jsonFormatHeighlight";

const HttpLogs = () => {
    const dateService = useMemo(() => new DateService(), []);
    const logService = useMemo(() => new LogService(), []);

    const [errorMessage, setErrorMessage] = useState('');
    const [levels, setLevels] = useState<string[]>([]);
    const [logs, setLogs] = useState<HttpLogEntry[]>();
    const [totalCount, setTotalCount] = useState(0);
    const [orderDirection, setOrderDirection] = useState('Desc');
    const [orderField, setOrderField] = useState('CalledOn');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(100);
    const [trackingId, setTrackingId] = useState<string>('');
    const [logLevel, setLogLevel] = useState<string>('');
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);

    const filter: HttpLogFilter = useMemo(() => {
        return {
            orderField: orderField,
            orderDirection: orderDirection,
            pageNumber: pageNumber,
            pageSize: pageSize,
            trackingId: trackingId,
            logLevel: logLevel,
            fromDate: fromDate != null ? dateService.dateToUtcFormat(fromDate) : null,
            toDate: toDate != null ? dateService.dateToUtcFormat(toDate) : null
        }
    }, [orderField, orderDirection, pageNumber, pageSize, trackingId, logLevel, fromDate, toDate, dateService]);

    useEffect(() => {
        logService.getLevels((levelResult) => {
            if (levelResult.success) {
                setLevels(levelResult.data);
            }
            else {
                setErrorMessage(levelResult.error);
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
        filter.trackingId = trackingId;
        filter.logLevel = logLevel;
        filter.fromDate = fromDate != null ? dateService.dateToUtcFormat(fromDate) : null;
        filter.toDate = toDate != null ? dateService.dateToUtcFormat(toDate) : null;

        logService.getHttpLogs(filter, (logResult) => {
            if (logResult.success) {
                setLogs(logResult.data);
                setTotalCount(logResult.totalCount);
            }
            else {
                setErrorMessage(logResult.error);
            }
        });
    }, [fromDate, toDate, logLevel, trackingId, pageSize, pageNumber, orderField, orderDirection, dateService, filter, logService]);

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
                        <label>Tracking Id</label>
                        <input className="form-control"
                            type="text"
                            id="trackingId"
                            data-testid="trackingId"
                            onChange={(e) => setTrackingId(e.currentTarget.value)} />
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
                                    orderField="CalledOn"
                                    orderChanged={() => orderChanged()} />
                                <SortHeader
                                    headerText="Tracking Id"
                                    orderData={filter}
                                    orderField="TrackingId"
                                    orderChanged={() => orderChanged()} />
                                <SortHeader
                                    headerText="Caller"
                                    orderData={filter}
                                    orderField="RequestIdentity"
                                    orderChanged={() => orderChanged()} />
                                <SortHeader
                                    headerText="Status"
                                    orderData={filter}
                                    orderField="StatusCode"
                                    orderChanged={() => orderChanged()} />
                                <SortHeader
                                    headerText="Duration(S)"
                                    orderData={filter}
                                    orderField="CallDuration"
                                    orderChanged={() => orderChanged()} />
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(logs || []).map((log, i) => {

                                let details: Array<any> = [];
                                let headerReqDataId: string = `header-req-data-${i}`;
                                let headerReqDataBtnId: string = `header-req-btn-${i}`;
                                let headerResDataId: string = `header-res-data-${i}`;
                                let headerResDataBtnId: string = `header-res-btn-${i}`;

                                details.push(<dl key="VerbLabel{i}">Verb</dl>);
                                details.push(<dt key="Verb{i}">{log.verb}</dt>);

                                details.push(<dl key="UrlLabel{i}">Url</dl>);
                                details.push(<dt key="Url{i}">{log.requestUri}</dt>);

                                details.push(<dl key="RequestLabel{i}">Request</dl>);
                                details.push(<dt key="Request{i}"><JsonFormatHeighlight text={log.request} /></dt>);

                                details.push(<dl key="ResponseLabel{i}">Response</dl>);
                                details.push(<dt key="Response{i}"><JsonFormatHeighlight text={log.response} /></dt>);

                                details.push(<dl key="RequestHeaderLabel{i}">Request Headers</dl>);
                                details.push(<dt key="RequestHeader{i}">
                                    <div id={headerReqDataId} className="hidden-header-data">
                                        <JsonFormatHeighlight text={log.requestHeaders} />
                                    </div>
                                    <div id={headerReqDataBtnId}>
                                        <button className="link-like-button" onClick={() => {
                                            document.getElementById(headerReqDataId)?.classList.remove('hidden-header-data');
                                            document.getElementById(headerReqDataBtnId)?.classList.add('hidden-header-data');
                                        }}>Show</button>
                                    </div>
                                </dt>);

                                details.push(<dl key="ResponseHeadersLabel{i}">Response Headers</dl>);
                                details.push(<dt key="ResponseHeader{i}">
                                    <div id={headerResDataId} className="hidden-header-data">
                                        <JsonFormatHeighlight text={log.responseHeaders} />
                                    </div>
                                    <div id={headerResDataBtnId}>
                                        <button className="link-like-button" onClick={() => {
                                            document.getElementById(headerResDataId)?.classList.remove('hidden-header-data');
                                            document.getElementById(headerResDataBtnId)?.classList.add('hidden-header-data');
                                        }}>Show</button>
                                    </div>
                                </dt>);

                                return (
                                    <tr key={i} data-testid='log-row'>
                                        <td><UtcView dateTime={log.logTimestamp}></UtcView> </td>
                                        <td>{log.trackingId}</td>
                                        <td>{log.caller}</td>
                                        <td>{log.status}</td>
                                        <td>{log.duration}</td>
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

export default HttpLogs;