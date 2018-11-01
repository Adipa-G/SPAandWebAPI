import * as React from 'react';
import { shallow } from 'enzyme';

import { ErrorMessage } from "../../../app/components/shared/errorMessage";

describe("<ErrorMessage/>", () => {
    it("should render", () => {
        const wrapper = shallow(<ErrorMessage errorMessage='__msg__' />);

        expect(wrapper.html()).toContain('alert alert-danger');
        expect(wrapper.html()).toContain('__msg__');
    });
});