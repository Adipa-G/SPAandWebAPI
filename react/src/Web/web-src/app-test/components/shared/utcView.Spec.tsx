declare var moment: any;

import * as React from 'react';
import { shallow } from 'enzyme';

import { UtcView } from "../../../app/components/shared/utcView";

describe("<UtcView/>", () => {
    it("should render", () => {
        var time = moment();
        var utc = time.clone().utc();

        const wrapper = shallow(<UtcView dateTime={utc.format()} />);

        expect(wrapper.html()).toContain(time.format("YYYY-MM-DD HH:mm:ss"));
    });
});