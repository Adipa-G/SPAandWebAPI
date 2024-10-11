import * as jQuery from "jquery";
import * as React from "react";

import { LogService } from "../services/logService"
import { DateService } from "../services/dateService"

import ErrorMessage from "./shared/errorMessage";
import TablePager from "./shared/tablePager";
import SortHeader from "./shared/sortHeader";
import UtcView from "./shared/utcView";

declare var window: any;
declare var moment: any;

export interface SystemLogProps { }

export interface SytemLogState {
    filter: any,
    levels: Array<any>,
    loggers: Array<any>,
    logs: Array<any>,
    totalCount: number,
    errorMessage: string;
}

export class SystemLogs extends React.Component<SystemLogProps, SytemLogState> {
    dateFormat: string = "yyyy-MM-dd";
    dateService: DateService;
    logService: LogService;

    constructor(props: any) {
        super(props);
        this.logService = new LogService();
        this.dateService = new DateService();

        this.state = {
            filter: {
                OrderField: 'LogTimestamp',
                OrderDirection: 'Desc',
                PageNumber: 1,
                PageSize: 100,
                Logger: '',
                LogLevel: '',
                FromDate: '',
                ToDate: ''
            },
            levels: [],
            loggers: [],
            logs: [],
            totalCount: 0,
            errorMessage: ''
        };
    }

    componentDidMount = () => {
        this.init(() => {
            this.loadSystemLogs();
            this.initDatePickers();
        });
    }

    initDatePickers = () => {
        ($('#fromDateGroup') as any).datetimepicker({
            format: "YYYY-MM-DD"
        });

        ($('#toDateGroup') as any).datetimepicker({
            format: "YYYY-MM-DD"
        });
    }

    init = (callback: Function) => {
        this.logService.getLevels((levelsResult: any) => {
            this.logService.getLoggers((loggersResult: any) => {
                let error: any = null;
                let levels: Array<any> = [];
                let loggers: Array<any> = [];

                if (!levelsResult.success) {
                    error = levelsResult.error;
                }
                else if (loggersResult.success) {
                    levels = levelsResult.data;
                    loggers = loggersResult.data;
                } else {
                    error = loggersResult.error;
                }

                this.setState((prevState: SytemLogState) => {
                    let newState: SytemLogState = jQuery.extend(true, {}, prevState) as SytemLogState;
                    if (error) {
                        newState.errorMessage = error;
                    } else {
                        newState.errorMessage = '';
                        newState.levels = levels;
                        newState.loggers = loggers;
                    }
                    return newState;
                });

                callback();
            });
        });
    }

    loadSystemLogs = () => {
        let loggerName: string = $('#loggerName').val() as string;
        let level: string = $('#logLevel').val() as string;

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
        filter.LogLevel = level;
        filter.FromDate = fromDate;
        filter.ToDate = toDate;

        this.logService.getSystemLogs(filter, (result: any) => {
            if (result.success) {
                this.setState((prevState: SytemLogState) => {
                    let newState: SytemLogState = jQuery.extend(true, {}, prevState) as SytemLogState;
                    newState.logs = result.data;
                    newState.totalCount = result.totalCount;
                    newState.filter = filter;
                    newState.errorMessage = '';
                    return newState;
                });
            } else {
                this.setState((prevState: SytemLogState) => {
                    let newState: SytemLogState = jQuery.extend(true, {}, prevState) as SytemLogState;
                    newState.errorMessage = result.error;
                    newState.filter = filter;
                    return newState;
                });
            }
        });
    }

    orderOrPageChanged = () => {
        this.loadSystemLogs();
    }

    render() {
        let levelsOptions: Array<any> = [];
        let loggerOptions: Array<any> = [];

        for (var i = 0; i < this.state.levels.length; i++) {
            let level = this.state.levels[i];
            levelsOptions.push(<option key={i} value={level}>{level}</option>);
        }

        for (var i = 0; i < this.state.loggers.length; i++) {
            let logger = this.state.loggers[i];
            loggerOptions.push(<option key={i} value={logger}>{logger}</option>);
        }

        return (
            <div id="system-log">
                <div className="row">
                    <div className="col-md-4 col-md-offset-2">
                        <div className="form-group">
                            <label>Level</label>
                            <select className="form-control"
                                id="logLevel"
                                onChange={() => { this.loadSystemLogs(); }}>
                                <option value="">Select</option>
                                {levelsOptions}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Logger Name</label>
                            <select className="form-control"
                                id="loggerName"
                                onChange={() => { this.loadSystemLogs(); }}>
                                <option value="">Select</option>
                                {loggerOptions}
                            </select>
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
                                onBlur={() => { this.loadSystemLogs(); }} />
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
                                onBlur={() => { this.loadSystemLogs(); }} />
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
                                        orderField="LogTimestamp"
                                        orderChanged={() => this.orderOrPageChanged()} />
                                    <SortHeader
                                        headerText="Logger"
                                        orderData={this.state.filter}
                                        orderField="Logger"
                                        orderChanged={() => this.orderOrPageChanged()} />
                                    <SortHeader
                                        headerText="Level"
                                        orderData={this.state.filter}
                                        orderField="Level"
                                        orderChanged={() => this.orderOrPageChanged()} />
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.logs.map((log, i) => {

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
                                        <tr key={i}>
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