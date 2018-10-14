import * as React from 'react';

import { shallow } from 'enzyme';

import { Layout } from "../../app/components/layout";

describe("<Layout/>", () => {
    it("constructor should set default state", () => {
        const wrapper = shallow(<Layout />);

        let state = wrapper.state() as any;

        expect(state).not.toBeNull();
        expect(state.registrationComplete).toBe(false);
    });

    it("when logOff then call authService and set state", () => {
        const wrapper = shallow(<Layout />);
        const instance = wrapper.instance() as any;

        instance.state.registrationComplete = true;
        instance.authService = { logOff: jest.fn(), getAuth: () => { return {}; } };

        instance.logOff();

        expect(instance.authService.logOff).toHaveBeenCalled();
        expect(instance.state.registrationComplete).toBe(false);
    });

    it("when logInComplete then set state", () => {
        const wrapper = shallow(<Layout />);
        const instance = wrapper.instance() as any;

        instance.state.registrationComplete = true;

        instance.logInComplete();

        expect(instance.state.registrationComplete).toBe(false);
    });

    it("when signUpComplete then set state", () => {
        jest.useFakeTimers();

        const wrapper = shallow(<Layout />);
        const instance = wrapper.instance() as any;
        instance.state.registrationComplete = false;

        instance.signUpComplete();
        jest.runAllTimers();

        expect(instance.state.registrationComplete).toBe(true);
    });

    it("when render then render username", () => {
        const wrapper = shallow(<Layout />);

        expect(wrapper.html()).toContain("User_1234");
    });
});