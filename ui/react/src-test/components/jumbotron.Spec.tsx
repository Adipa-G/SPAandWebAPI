import * as React from 'react';
import { shallow } from 'enzyme';

import { Jumbotron } from "../../app/components/jumbotron";

describe("<Jumbotron/>", () => {
    it("should render when no Auth", () => {
        const wrapper = shallow(<Jumbotron isAuth={false} />);

        expect(wrapper.html()).toContain('jumbotron');
    });

    it("should render when Auth", () => {
        const wrapper = shallow(<Jumbotron isAuth={true} />);

        expect(wrapper.html()).toBeNull();
    });
});