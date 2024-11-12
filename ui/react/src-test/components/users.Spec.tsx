declare var global: any;

import * as React from 'react';
import { shallow } from 'enzyme';

import { ErrorMessage } from "../../app/components/shared/errorMessage";
import { TablePager } from "../../app/components/shared/tablePager";
import { SortHeader } from "../../app/components/shared/sortHeader";

import { Users } from "../../app/components/users";

describe("<Users/>", () => {
    it("constructor should set default state", () => {
        const wrapper = shallow(<Users />);

        let state = wrapper.state() as any;

        expect(state).not.toBeNull();
        expect(state.totalCount).toBe(0);
        expect(state.users.length).toBe(0);
        expect(state.errorMessage).toBe('');
        
        const sortAndPage = state.sortAndPage;
        expect(sortAndPage).not.toBeNull();
        expect(sortAndPage.OrderField).toBe('UserName');
        expect(sortAndPage.OrderDirection).toBe('Asc');
        expect(sortAndPage.PageNumber).toBe(1);
        expect(sortAndPage.PageSize).toBe(10);
    });

    it("componentDidMount call loadUsers", () => {
        const wrapper = shallow(<Users />);
        const instance = wrapper.instance() as any;

        instance.loadUsers = jest.fn();
       
        instance.componentDidMount();

        expect(instance.loadUsers).toHaveBeenCalled();
    });

    describe("loadUsers", () => {
        it("when success result", () => {
            const wrapper = shallow(<Users />);
            const instance = wrapper.instance() as any;

            instance.userService = {
                getUsers: (filter: any, callback: Function) => {
                    callback({
                        success: true,
                        users: [{ UserName: 'Name 1' }, { UserName: 'Name 2' }],
                        totalCount: 100
                    });
                }
            };

            instance.loadUsers();

            let state = instance.state as any;
            expect(state.users.length).toBe(2);
            expect(state.totalCount).toBe(100);
            expect(state.errorMessage).toBeNull();
        });

        it("when error result", () => {
            const wrapper = shallow(<Users />);
            const instance = wrapper.instance() as any;

            instance.userService = {
                getUsers: (filter: any, callback: Function) => {
                    callback({
                        success: false,
                        error: 'This is an error',
                    });
                }
            };

            instance.loadUsers();

            let state = instance.state as any;
            expect(state.users.length).toBe(0);
            expect(state.totalCount).toBe(0);
            expect(state.errorMessage).toBe('This is an error');
        });
    });

    describe("deleteUser", () => {
        it("when success result", () => {
            global.confirm = () => true;
            const wrapper = shallow(<Users />);
            const instance = wrapper.instance() as any;
            instance.state = { users: [{ UserName: 'Name 1' }, { UserName: 'Name 2' }], totalCount: 100 };

            instance.userService = {
                deleteUser: (user: any, callback: Function) => {
                    callback({
                        success: true
                    });
                }
            };

            instance.deleteUser(instance.state.users[0]);

            let state = instance.state as any;
            expect(state.users.length).toBe(1);
            expect(state.totalCount).toBe(99);
        });

        it("when error result", () => {
            global.confirm = () => true;
            const wrapper = shallow(<Users />);
            const instance = wrapper.instance() as any;
            instance.state = { users: [{ UserName: 'Name 1' }, { UserName: 'Name 2' }], totalCount: 100 };

            instance.userService = {
                deleteUser: (user: any, callback: Function) => {
                    callback({
                        success: false,
                        error: 'This is an error'
                    });
                }
            };

            instance.deleteUser(instance.state.users[0]);

            let state = instance.state as any;
            expect(state.users.length).toBe(2);
            expect(state.totalCount).toBe(100);
            expect(state.errorMessage).toBe('This is an error');
        });
    });
    
    it("when orderOrPageChanged then call loadHttpLogs", () => {
        const wrapper = shallow(<Users />);
        const instance = wrapper.instance() as any;

        instance.loadUsers = jest.fn();

        instance.orderOrPageChanged();

        expect(instance.loadUsers).toHaveBeenCalled();
    });

    it("when render then render child components", () => {
        const wrapper = shallow(<Users />);

        const instance = wrapper.instance();

        const state = instance.state as any;
        state.logs = [{ logTimestamp: '2010/05/05', request: 'abc' }];
        instance.forceUpdate();

        expect(wrapper.find(ErrorMessage).length).toBe(1);
        expect(wrapper.find(TablePager).length).toBe(1);
        expect(wrapper.find(SortHeader).length).toBe(1);
    });

    it("when a row then it render", () => {
        const wrapper = shallow(<Users />);

        const instance = wrapper.instance();

        const state = instance.state as any;
        state.users = [
            {
                userName: '__user__'
            }
        ];
        instance.forceUpdate();

        expect(wrapper.html()).toContain('__user__');
    });
});