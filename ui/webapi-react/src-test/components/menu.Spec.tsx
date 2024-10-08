import * as React from 'react';
import { HashRouter } from 'react-router-dom';

import { shallow } from 'enzyme';

import { Menu } from "../../app/components/menu";

describe("<Menu/>", () => {
    it("should render when no Auth", () => {
        const wrapper = shallow(<HashRouter><Menu isAuth={false} logOff={() => { }} /></HashRouter>);

        expect(wrapper.html()).toContain('Login');
        expect(wrapper.html()).toContain('Sign up');
        expect(wrapper.html()).not.toContain('Users');
    });

    it("should render when Auth", () => {
        const wrapper = shallow(<HashRouter><Menu isAuth={true} logOff={() => { }} /></HashRouter>);

        expect(wrapper.html()).toContain('Users');
        expect(wrapper.html()).toContain('System Log');
        expect(wrapper.html()).toContain('Http Log');
        expect(wrapper.html()).toContain('Logout');
        expect(wrapper.html()).not.toContain('Login');
    });

    it("should call callback on logoff", () => {
        const callback = jest.fn();
        const wrapper = shallow(<Menu isAuth={true} logOff={callback} />);
        
        wrapper.find('a').at(3).simulate('click');
        
        expect(wrapper.find('a').length).toBe(4);
        expect(callback).toHaveBeenCalled();
    });
});