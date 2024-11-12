import * as React from 'react';
import { shallow } from 'enzyme';

import { SignUp } from "../../app/components/signup";

describe("<Signup/>", () => {
    
    it("when signup with empty username or password then shows error message", () => {
        const callback = jest.fn();
        const wrapper = shallow(<SignUp signupComplete={callback} />);
        const instance = wrapper.instance() as any;

        wrapper.find('.btn').simulate('click');

        expect(instance.state.errorMessage).toContain("username and password");
        expect(callback).not.toHaveBeenCalled();
    });

    it("when signup with short username then shows error message", () => {
        const callback = jest.fn();
        const wrapper = shallow(<SignUp signupComplete={callback} />);
        const instance = wrapper.instance() as any;

        instance.state.userName = 'ab';
        instance.state.password = 'password';

        wrapper.find('.btn').simulate('click');

        expect(instance.state.errorMessage).toContain("3 characters");
        expect(callback).not.toHaveBeenCalled();
    });

    it("when signup with short password then shows error message", () => {
        const callback = jest.fn();
        const wrapper = shallow(<SignUp signupComplete={callback} />);
        const instance = wrapper.instance() as any;

        instance.state.userName = 'user';
        instance.state.password = 'pass';

        wrapper.find('.btn').simulate('click');

        expect(instance.state.errorMessage).toContain("6 characters");
        expect(callback).not.toHaveBeenCalled();
    });

    it("when signup with non matching password then shows error message", () => {
        const callback = jest.fn();
        const wrapper = shallow(<SignUp signupComplete={callback} />);
        const instance = wrapper.instance() as any;

        instance.state.userName = 'user';
        instance.state.password = 'password';
        instance.state.confirmPassword = 'password1';

        wrapper.find('.btn').simulate('click');

        expect(instance.state.errorMessage).toContain("should match");
        expect(callback).not.toHaveBeenCalled();
    });

    it("when signup with error response then call auth service and set state", () => {
        const callback = jest.fn();
        const wrapper = shallow(<SignUp signupComplete={callback} />);
        const instance = wrapper.instance() as any;

        instance.authService = {
            signup: (user: string, pwd: string, callback: Function) => {
                callback({ success: false });
            }
        };

        const userBox = wrapper.find('#registrationUserName');
        userBox.simulate('change', { target: { value: 'user' } });

        const passBox = wrapper.find('#registrationPassword') as any;
        passBox.simulate('change', { target: { value: 'password' } });

        const confirmPassBox = wrapper.find('#registrationConfirmPassword') as any;
        confirmPassBox.simulate('change', { target: { value: 'password' } });

        wrapper.find('.btn').simulate('click');

        expect(instance.state.successMessage).toBeNull();
        expect(instance.state.errorMessage).toContain("error while");
        expect(callback).not.toHaveBeenCalled();
    });

    it("when signup with successful response then call auth service and set state", () => {
        const callback = jest.fn();
        const wrapper = shallow(<SignUp signupComplete={callback} />);
        const instance = wrapper.instance() as any;

        instance.authService = {
            signup: (user: string, pwd: string, callback: Function) => {
                callback({ success: true });
            }
        };

        const userBox = wrapper.find('#registrationUserName');
        userBox.simulate('change', { target: { value: 'user' } });

        const passBox = wrapper.find('#registrationPassword') as any;
        passBox.simulate('change', { target: { value: 'password' } });

        const confirmPassBox = wrapper.find('#registrationConfirmPassword') as any;
        confirmPassBox.simulate('change', { target: { value: 'password' } });

        wrapper.find('.btn').simulate('click');

        expect(instance.state.errorMessage).toBeNull();
        expect(instance.state.successMessage).toContain("successful");
        expect(callback).toHaveBeenCalled();
    });
});