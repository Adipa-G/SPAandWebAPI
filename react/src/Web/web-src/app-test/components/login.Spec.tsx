import * as React from 'react';
import { shallow } from 'enzyme';

import { Login } from "../../app/components/login";

describe("<Login/>", () => {
    
    it("when login with empty username or password then shows error message", () => {
        const callback = jest.fn();
        const wrapper = shallow(<Login loginComplete={callback} />);
        const instance = wrapper.instance() as any;

        wrapper.find('.btn').simulate('click');

        expect(instance.state.errorMessage).toContain("username and password");
        expect(callback).not.toHaveBeenCalled();
    });

    it("when login with invalid credentials then call auth service and set state", () => {
        const callback = jest.fn();
        const wrapper = shallow(<Login loginComplete={callback} />);
        const instance = wrapper.instance() as any;

        instance.authService = {
            authenticate: (user: string, pwd: string, callback: Function) => {
                callback({ success: false });
            }
        };

        const userBox = wrapper.find('#loginUserName');
        userBox.simulate('change', { target: { value: 'user' } });

        const passBox = wrapper.find('#loginPassword') as any;
        passBox.simulate('change', { target: { value: 'pass' } });

        wrapper.find('.btn').simulate('click');

        expect(instance.state.errorMessage).toContain("Invalid credentials");
        expect(callback).not.toHaveBeenCalled();
    });

    it("when login with valid credentials then call auth service and set state", () => {
        const callback = jest.fn();
        const wrapper = shallow(<Login loginComplete={callback} />);
        const instance = wrapper.instance() as any;

        instance.authService = {
            authenticate: (user: string, pwd: string, callback: Function) => {
                callback({ success: true });
            }
        };

        const userBox = wrapper.find('#loginUserName');
        userBox.simulate('change', { target: { value: 'user' } });

        const passBox = wrapper.find('#loginPassword') as any;
        passBox.simulate('change', { target: { value: 'pass' } });

        wrapper.find('.btn').simulate('click');

        expect(instance.state.errorMessage).toBeNull();
        expect(callback).toHaveBeenCalled();
    });
});