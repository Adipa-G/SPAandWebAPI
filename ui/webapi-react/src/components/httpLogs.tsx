import * as jQuery from "jquery";
import * as React from "react";

import { LogService } from "../services/logService"
import { DateService } from "../services/dateService"

import { ErrorMessage } from "./shared/errorMessage";
import { TablePager } from "./shared/tablePager";
import { SortHeader } from "./shared/sortHeader";
import { UtcView } from "./shared/utcView";
import { JsonFormatHeighlight } from "./shared/jsonFormatHeighlight";

export interface HttpLogProps { }

export interface HttpLogState {
    filter: any,
    levels: Array<any>,
    logs: Array<any>,
    totalCount: number,
    errorMessage: string;
}

export class HttpLogs extends React.Component<HttpLogProps, HttpLogState> {
    dateFormat: string = "yyyy-MM-dd";
    dateService: DateService;
    logService: LogService;

    constructor(props: any) {
        super(props);

        this.logService = new LogService();
        this.dateService = new DateService();

        this.state = {
            filter: {
                OrderField: 'CalledOn',
                OrderDirection: 'Desc',
                PageNumber: 1,
                PageSize: 100,
                TrackingId: '',
                LogLevel: '',
                FromDate: '',
                ToDate: ''
            },
            levels: [],
            logs: [],
            totalCount: 0,
            errorMessage: ''
        };
    }

    componentDidMount = () => {
        this.init(() => {
            this.loadHttpLogs();
            this.initDatePickers();
        });
    }

    init = (callback: Function) => {
        this.logService.getLevels((levelsResult: any) => {
            let error: any = null;
            let levels: Array<any> = [];

            if (levelsResult.success) {
                levels = levelsResult.data;
            }
            else {
                error = levelsResult.error;
            }

            this.setState((prevState: HttpLogState) => {
                let newState: HttpLogState = jQuery.extend(true, {}, prevState) as HttpLogState;
                if (error) {
                    newState.errorMessage = error;
                    newState.levels = [];
                } else {
                    newState.errorMessage = '';
                    newState.levels = levels;
                }
                return newState;
            });

            callback();
        });
    };

    initDatePickers = () => {
        ($('#fromDateGroup') as any).datetimepicker({
            format: "YYYY-MM-DD"
        });

        ($('#toDateGroup') as any).datetimepicker({
            format: "YYYY-MM-DD"
        });
    }

    loadHttpLogs = () => {
        let loggerName: string = $('#loggerName').val() as string;
        let trackingId: string = $('#trackingId').val() as string;

        let fromDate: string = $('#fromDate').val() as string;
        if (fromDate) {
            fromDate = this.dateService.dateToUtcFormat(fromDate);
        }

        let toDate: string = $('#toDate').val() as string;
        if (toDate) {
            toDate = this.dateService.dateToUtcFormat(toDate);
        }

        let filter = jQuery.extend(true, {}, this.state.filter) as any;
        filter.Logger = loggerName;
        filter.TrackingId = trackingId;
        filter.FromDate = fromDate;
        filter.ToDate = toDate;

        this.logService.getHttpLogs(filter, (result: any) => {
            if (result.success) {
                this.setState((prevState: HttpLogState) => {
                    let newState: HttpLogState = jQuery.extend(true, {}, prevState) as HttpLogState;
                    newState.logs = result.data;
                    newState.totalCount = result.totalCount;
                    newState.filter = filter;
                    newState.errorMessage = '';
                    return newState;
                });
            } else {
                this.setState((prevState: HttpLogState) => {
                    let newState: HttpLogState = jQuery.extend(true, {}, prevState) as HttpLogState;
                    newState.errorMessage = result.error;
                    newState.filter = filter;
                    return newState;
                });
            }
        });
    }

    orderOrPageChanged = () => {
        this.loadHttpLogs();
    }

    render() {
        let levelsOptions: Array<any> = [];

        for (var i = 0; i < this.state.levels.length; i++) {
            let level = this.state.levels[i];
            levelsOptions.push(<option key={i} value={level}>{level}</option>);
        }

        return (
            <div id="http-log">
                <div className="row">
                    <div className="col-md-4 col-md-offset-2">
                        <div className="form-group">
                            <label>Level</label>
                            <select className="form-control"
                                id="logLevel"
                                onChange={() => { this.loadHttpLogs(); }}>
                                <option value="">Select</option>
                                {levelsOptions}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Tracking Id</label>
                            <input className="form-control"
                                type="text"
                                id="trackingId"
                                onChange={() => { this.loadHttpLogs(); }} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-2">
                        <label>Date Range</label>
                        <div className="input-group" id="fromDateGroup">
                            <input type="text"
                                id="fromDate"
                                className="form-control"
                                placeholder="yyyy-MM-dd"
                                onBlur={() => { this.loadHttpLogs(); }} />
                            <div className="input-group-addon">
                                <i className="fa fa-calendar"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label>&nbsp;</label>
                        <div className="input-group" id="toDateGroup">
                            <input type="text"
                                id="toDate"
                                className="form-control"
                                placeholder="yyyy-MM-dd"
                                onBlur={() => { this.loadHttpLogs(); }} />
                            <div className="input-group-addon">
                                <i className="fa fa-calendar"></i>
                            </div>
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
                                        orderData={this.state.filter}
                                        orderField="CalledOn"
                                        orderChanged={() => this.orderOrPageChanged()} />
                                    <SortHeader
                                        headerText="Tracking Id"
                                        orderData={this.state.filter}
                                        orderField="TrackingId"
                                        orderChanged={() => this.orderOrPageChanged()} />
                                    <SortHeader
                                        headerText="Caller"
                                        orderData={this.state.filter}
                                        orderField="RequestIdentity"
                                        orderChanged={() => this.orderOrPageChanged()} />
                                    <SortHeader
                                        headerText="Status"
                                        orderData={this.state.filter}
                                        orderField="StatusCode"
                                        orderChanged={() => this.orderOrPageChanged()} />
                                    <SortHeader
                                        headerText="Duration(S)"
                                        orderData={this.state.filter}
                                        orderField="CallDuration"
                                        orderChanged={() => this.orderOrPageChanged()} />
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.logs.map((log, i) => {

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
                                            <a onClick={() => {
                                                $('#' + headerReqDataId).removeClass('hidden-header-data');
                                                $('#' + headerReqDataBtnId).addClass('hidden-header-data');
                                            }}>Show</a>
                                        </div>
                                    </dt>);

                                    details.push(<dl key="ResponseHeadersLabel{i}">Response Headers</dl>);
                                    details.push(<dt key="ResponseHeader{i}">
                                        <div id={headerResDataId} className="hidden-header-data">
                                            <JsonFormatHeighlight text={log.responseHeaders} />
                                        </div>
                                        <div id={headerResDataBtnId}>
                                            <a onClick={() => {
                                                $('#' + headerResDataId).removeClass('hidden-header-data');
                                                $('#' + headerResDataBtnId).addClass('hidden-header-data');
                                            }}>Show</a>
                                        </div>
                                    </dt>);

                                    return (
                                        <tr key={i}>
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
                            totalCount={this.state.totalCount}
                            pageData={this.state.filter}
                            pageChanged={() => this.orderOrPageChanged()} />
                        <ErrorMessage errorMessage={this.state.errorMessage} />
                    </div>
                </div>
            </div>
        );
    }
}