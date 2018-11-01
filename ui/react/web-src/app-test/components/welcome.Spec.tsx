import * as React from 'react';
import { shallow } from 'enzyme';

import { Welcome } from "../../app/components/welcome";

describe("<Welcome/>", () => {
    it("should render", () => {
        const wrapper = shallow(<Welcome userName={'__user__'} />);

        expect(wrapper.html()).toContain('__user__');
        expect(wrapper.html()).toContain('navbar-brand');
    });
});