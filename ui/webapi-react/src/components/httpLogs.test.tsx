import { BrowserRouter } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import HttpLogs from './httpLogs'

const server = setupServer(
    http.get('../api/log/levels1', () => {
        return HttpResponse.json(['Info', 'Error'])
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('set log levels', async () => {
    render(<BrowserRouter><HttpLogs /></BrowserRouter>);

    let levelsDropdown = await screen.getByTestId('logLevel');

    screen.debug();

    expect(levelsDropdown).toHaveProperty('u');
})

/*test('set default values', () => {
    jest.mock("../services/logService", () => {
        const levels = ['Debug', 'Info'];
        return {
            getLevels: (callback: (result: any) => {}) => callback({ success: true, levels: levels })
        };
    });

    render(<HttpLogs />);

    screen.debug();
});
*/
/*
describe("<HttpLogs/>", () => {
    it("constructor should set default state", () => {
        const wrapper = shallow(<HttpLogs />);

        let state = wrapper.state() as any;

        expect(state).not.toBeNull();
        expect(state.levels.length).toBe(0);
        expect(state.logs.length).toBe(0);
        expect(state.totalCount).toBe(0);
        expect(state.errorMessage).toBeNull();

        const filter = state.filter;
        expect(filter).not.toBeNull();
        expect(filter.OrderField).toBe('CalledOn');
        expect(filter.OrderDirection).toBe('Desc');
        expect(filter.PageNumber).toBe(1);
        expect(filter.PageSize).toBe(100);
        expect(filter.TrackingId).toBe('');
        expect(filter.LogLevel).toBe('');
        expect(filter.FromDate).toBe('');
        expect(filter.ToDate).toBe('');
    });

    it("componentDidMount call init and callback", () => {
        const wrapper = shallow(<HttpLogs />);
        const instance = wrapper.instance() as any;

        instance.init = jest.fn((callback: Function) => { callback(); });
        instance.loadHttpLogs = jest.fn();
        instance.initDatePickers = jest.fn();

        instance.componentDidMount();

        expect(instance.init).toHaveBeenCalled();
        expect(instance.loadHttpLogs).toHaveBeenCalled();
        expect(instance.initDatePickers).toHaveBeenCalled();
    });

    describe("getLevels", () => {
        it("when success result", () => {
            const wrapper = shallow(<HttpLogs />);
            const instance = wrapper.instance() as any;
            const callback = jest.fn();

            instance.logService = {
                getLevels: (callback: Function) => {
                    callback({
                        success: true,
                        data: ['Info', 'Error']
                    });
                }
            };

            instance.init(callback);

            let state = instance.state as any;
            expect(state.levels.length).toBe(2);
            expect(state.errorMessage).toBeNull();
            expect(callback).toHaveBeenCalled();
        });

        it("when error result", () => {
            const wrapper = shallow(<HttpLogs />);
            const instance = wrapper.instance() as any;
            const callback = jest.fn();

            instance.logService = {
                getLevels: (callback: Function) => {
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

    describe("loadHttpLogs", () => {
        it("when success result", () => {
            const wrapper = shallow(<HttpLogs />);
            const instance = wrapper.instance() as any;

            instance.logService = {
                getHttpLogs: (filter: any, callback: Function) => {
                    callback({
                        success: true,
                        data: [{ Description: 'Desc 1' }, { Description: 'Desc 2' }],
                        totalCount: 100
                    });
                }
            };

            instance.loadHttpLogs();

            let state = instance.state as any;
            expect(state.logs.length).toBe(2);
            expect(state.totalCount).toBe(100);
            expect(state.errorMessage).toBeNull();
        });

        it("when error result", () => {
            const wrapper = shallow(<HttpLogs />);
            const instance = wrapper.instance() as any;

            instance.logService = {
                getHttpLogs: (filter: any, callback: Function) => {
                    callback({
                        success: false,
                        error: 'This is an error',
                    });
                }
            };

            instance.loadHttpLogs();

            let state = instance.state as any;
            expect(state.errorMessage).toBe('This is an error');
        });
    });

    it("when orderOrPageChanged then call loadHttpLogs", () => {
        const wrapper = shallow(<HttpLogs />);
        const instance = wrapper.instance() as any;

        instance.loadHttpLogs = jest.fn();

        instance.orderOrPageChanged();

        expect(instance.loadHttpLogs).toHaveBeenCalled();
    });

    it("when render then render child components", () => {
        const wrapper = shallow(<HttpLogs />);

        const instance = wrapper.instance();

        const state = instance.state as any;
        state.logs = [{ logTimestamp: '2010/05/05', request: 'abc' }];
        instance.forceUpdate();

        expect(wrapper.find(ErrorMessage).length).toBe(1);
        expect(wrapper.find(TablePager).length).toBe(1);
        expect(wrapper.find(SortHeader).length).toBe(5);
        expect(wrapper.find(UtcView).length).toBe(1);
        expect(wrapper.find(JsonFormatHeighlight).length).toBe(4);
    });

    it("when a row then it render", () => {
        const wrapper = shallow(<HttpLogs />);

        const instance = wrapper.instance();

        const state = instance.state as any;
        state.logs = [
            {
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
                responseHeaders: '__responseHeaders__',
            }
        ];
        instance.forceUpdate();

        expect(wrapper.html()).toContain('__trackingId__');
        expect(wrapper.html()).toContain('__caller__');
        expect(wrapper.html()).toContain('__status__');
        expect(wrapper.html()).toContain('__duration__');
        expect(wrapper.html()).toContain('__verb__');
        expect(wrapper.html()).toContain('__requestUri__');
        expect(wrapper.html()).toContain('__request__');
        expect(wrapper.html()).toContain('__response__');
        expect(wrapper.html()).toContain('__requestHeaders__');
        expect(wrapper.html()).toContain('__responseHeaders__');
    });

    it("when logLevel changed then call loadHttpLogs", () => {
        const wrapper = shallow(<HttpLogs />);
        const instance = wrapper.instance() as any;
        instance.loadHttpLogs = jest.fn();

        wrapper.find('#logLevel').simulate('change');

        expect(instance.loadHttpLogs).toHaveBeenCalled();
    });

    it("when trackingId changed then call loadHttpLogs", () => {
        const wrapper = shallow(<HttpLogs />);
        const instance = wrapper.instance() as any;
        instance.loadHttpLogs = jest.fn();

        wrapper.find('#trackingId').simulate('change');

        expect(instance.loadHttpLogs).toHaveBeenCalled();
    });

    it("when fromDate changed then call loadHttpLogs", () => {
        const wrapper = shallow(<HttpLogs />);
        const instance = wrapper.instance() as any;
        instance.loadHttpLogs = jest.fn();

        wrapper.find('#fromDate').simulate('blur');

        expect(instance.loadHttpLogs).toHaveBeenCalled();
    });

    it("when toDate changed then call loadHttpLogs", () => {
        const wrapper = shallow(<HttpLogs />);
        const instance = wrapper.instance() as any;
        instance.loadHttpLogs = jest.fn();

        wrapper.find('#toDate').simulate('blur');

        expect(instance.loadHttpLogs).toHaveBeenCalled();
    });
});
*/