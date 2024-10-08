import * as React from 'react';
import { shallow } from 'enzyme';

import { ErrorMessage } from "../../app/components/shared/errorMessage";
import { TablePager } from "../../app/components/shared/tablePager";
import { SortHeader } from "../../app/components/shared/sortHeader";
import { UtcView } from "../../app/components/shared/utcView";
import { JsonFormatHeighlight } from "../../app/components/shared/jsonFormatHeighlight";

import { SystemLogs } from "../../app/components/systemLogs";

describe("<HttpLogs/>", () => {
    it("constructor should set default state", () => {
        const wrapper = shallow(<SystemLogs />);

        let state = wrapper.state() as any;

        expect(state).not.toBeNull();
        expect(state.levels.length).toBe(0);
        expect(state.logs.length).toBe(0);
        expect(state.totalCount).toBe(0);
        expect(state.errorMessage).toBeNull();
        
        const filter = state.filter;
        expect(filter).not.toBeNull();
        expect(filter.OrderField).toBe('LogTimestamp');
        expect(filter.OrderDirection).toBe('Desc');
        expect(filter.PageNumber).toBe(1);
        expect(filter.PageSize).toBe(100);
        expect(filter.Logger).toBe('');
        expect(filter.LogLevel).toBe('');
        expect(filter.FromDate).toBe('');
        expect(filter.ToDate).toBe('');
    });

    it("componentDidMount call init and callback", () => {
        const wrapper = shallow(<SystemLogs />);
        const instance = wrapper.instance() as any;

        instance.init = jest.fn((callback: Function) => { callback(); });
        instance.loadSystemLogs = jest.fn();
        instance.initDatePickers = jest.fn();

        instance.componentDidMount();

        expect(instance.init).toHaveBeenCalled();
        expect(instance.loadSystemLogs).toHaveBeenCalled();
        expect(instance.initDatePickers).toHaveBeenCalled();
    });

    describe("getLevels and getLoggers", () => {
        it("when success result", () => {
            const wrapper = shallow(<SystemLogs />);
            const instance = wrapper.instance() as any;
            const callback = jest.fn();

            instance.logService = {
                getLevels: (callback: Function) => {
                    callback({
                        success: true,
                        data: ['Info', 'Error']
                    });
                }, 
                getLoggers: (callback: Function) => {
                    callback({
                        success: true,
                        data: ['SQL', 'Hibernate']
                    });
                }
            };

            instance.init(callback);

            let state = instance.state as any;
            expect(state.levels.length).toBe(2);
            expect(state.loggers.length).toBe(2);
            expect(state.errorMessage).toBeNull();
            expect(callback).toHaveBeenCalled();
        });

        it("when error result from levels", () => {
            const wrapper = shallow(<SystemLogs />);
            const instance = wrapper.instance() as any;
            const callback = jest.fn();

            instance.logService = {
                getLevels: (callback: Function) => {
                    callback({
                        success: false,
                        error: 'This is an error'
                    });
                },
                getLoggers: (callback: Function) => {
                    callback({
                        success: true,
                        data: ['SQL', 'Hibernate']
                    });
                }
            };

            instance.init(callback);

            let state = instance.state as any;
            expect(state.levels.length).toBe(0);
            expect(state.errorMessage).toBe('This is an error');
            expect(callback).toHaveBeenCalled();
        });

        it("when error result from loggers", () => {
            const wrapper = shallow(<SystemLogs />);
            const instance = wrapper.instance() as any;
            const callback = jest.fn();

            instance.logService = {
                getLevels: (callback: Function) => {
                    callback({
                        success: true,
                        data: ['Info', 'Error']
                    });
                },
                getLoggers: (callback: Function) => {
                    callback({
                        success: false,
                        error: 'This is an error'
                    });
                }
            };

            instance.init(callback);

            let state = instance.state as any;
            expect(state.levels.length).toBe(0);
            expect(state.errorMessage).toBe('This is an error');
            expect(callback).toHaveBeenCalled();
        });
    });

    describe("loadSystemLogs", () => {
        it("when success result", () => {
            const wrapper = shallow(<SystemLogs />);
            const instance = wrapper.instance() as any;

            instance.logService = {
                getSystemLogs: (filter: any, callback: Function) => {
                    callback({
                        success: true,
                        data: [{ Description: 'Desc 1' }, { Description: 'Desc 2' }],
                        totalCount: 100
                    });
                }
            };

            instance.loadSystemLogs();

            let state = instance.state as any;
            expect(state.logs.length).toBe(2);
            expect(state.totalCount).toBe(100);
            expect(state.errorMessage).toBeNull();
        });

        it("when error result", () => {
            const wrapper = shallow(<SystemLogs />);
            const instance = wrapper.instance() as any;

            instance.logService = {
                getSystemLogs: (filter: any, callback: Function) => {
                    callback({
                        success: false,
                        error: 'This is an error',
                    });
                }
            };

            instance.loadSystemLogs();

            let state = instance.state as any;
            expect(state.errorMessage).toBe('This is an error');
        });
    });
    
    it("when orderOrPageChanged then call loadHttpLogs", () => {
        const wrapper = shallow(<SystemLogs />);
        const instance = wrapper.instance() as any;

        instance.loadSystemLogs = jest.fn();

        instance.orderOrPageChanged();

        expect(instance.loadSystemLogs).toHaveBeenCalled();
    });

    it("when render then render child components", () => {
        const wrapper = shallow(<SystemLogs />);

        const instance = wrapper.instance();

        const state = instance.state as any;
        state.logs = [{ logTimestamp: '2010/05/05', request: 'abc' }];
        instance.forceUpdate();

        expect(wrapper.find(ErrorMessage).length).toBe(1);
        expect(wrapper.find(TablePager).length).toBe(1);
        expect(wrapper.find(SortHeader).length).toBe(3);
        expect(wrapper.find(UtcView).length).toBe(1);
    });

    it("when a row then it render", () => {
        const wrapper = shallow(<SystemLogs />);

        const instance = wrapper.instance();

        const state = instance.state as any;
        state.logs = [
            {
                logTimestamp: '2010-05-05T23:59:00',
                logger: '__logger__',
                level: '__level__',
                message: '__message__',
                stackTrace: '__stackTrace__'
            }
        ];
        instance.forceUpdate();

        expect(wrapper.html()).toContain('__logger__');
        expect(wrapper.html()).toContain('__level__');
        expect(wrapper.html()).toContain('__message__');
        expect(wrapper.html()).toContain('__stackTrace__');
    });

    it("when logLevel changed then call loadHttpLogs", () => {
        const wrapper = shallow(<SystemLogs />);
        const instance = wrapper.instance() as any;
        instance.loadSystemLogs = jest.fn();

        wrapper.find('#logLevel').simulate('change');

        expect(instance.loadSystemLogs).toHaveBeenCalled();
    });

    it("when trackingId changed then call loadHttpLogs", () => {
        const wrapper = shallow(<SystemLogs />);
        const instance = wrapper.instance() as any;
        instance.loadSystemLogs = jest.fn();

        wrapper.find('#loggerName').simulate('change');

        expect(instance.loadSystemLogs).toHaveBeenCalled();
    });

    it("when fromDate changed then call loadHttpLogs", () => {
        const wrapper = shallow(<SystemLogs />);
        const instance = wrapper.instance() as any;
        instance.loadSystemLogs = jest.fn();

        wrapper.find('#fromDate').simulate('blur');

        expect(instance.loadSystemLogs).toHaveBeenCalled();
    });

    it("when toDate changed then call loadHttpLogs", () => {
        const wrapper = shallow(<SystemLogs />);
        const instance = wrapper.instance() as any;
        instance.loadSystemLogs = jest.fn();

        wrapper.find('#toDate').simulate('blur');

        expect(instance.loadSystemLogs).toHaveBeenCalled();
    });
});