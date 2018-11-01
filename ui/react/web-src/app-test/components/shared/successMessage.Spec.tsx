import * as React from 'react';
import { shallow } from 'enzyme';

import { SuccessMessage } from "../../../app/components/shared/successMessage";

describe("<SuccessMessage/>", () => {
    it("should render", () => {
        const wrapper = shallow(<SuccessMessage successMessage='__msg__' />);

        expect(wrapper.html()).toContain('alert alert-success');
        expect(wrapper.html()).toContain('__msg__');
    });
});