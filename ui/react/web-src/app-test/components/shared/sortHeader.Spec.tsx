import * as React from 'react';
import { shallow } from 'enzyme';

import { SortHeader } from "../../../app/components/shared/sortHeader";

describe("<SortHeader/>", () => {
    it("Given not sorted when clicked then sort by field asending", () => {
        const callback = jest.fn();
        let orderData = { OrderField: "OtherField", OrderDirection: "Desc" }; 
        const wrapper = shallow(<SortHeader
            headerText="__header__"
            orderData={orderData}
            orderField="ThisField"
            orderChanged={callback} />);
        const instance = wrapper.instance() as any;

        wrapper.simulate('click');

        expect(wrapper.html()).toContain("__header__");
        expect(wrapper.html()).toContain("fa-sort-alpha-asc");
  
        expect(orderData.OrderField).toBe("ThisField");
        expect(instance.state.direction).toBe("Asc");
        expect(orderData.OrderDirection).toBe("Asc");
        expect(callback).toHaveBeenCalled();
    });

    it("Given sort ascending when clicked then sort by field descending", () => {
        let orderData = { OrderField: "ThisField", OrderDirection: "Asc" };
        const wrapper = shallow(<SortHeader
            headerText="__header__"
            orderData={orderData}
            orderField="ThisField"
            orderChanged={() => {}} />);
        const instance = wrapper.instance() as any;

        wrapper.simulate('click');

        expect(wrapper.html()).toContain("fa-sort-alpha-desc");

        expect(orderData.OrderField).toBe("ThisField");
        expect(instance.state.direction).toBe("Desc");
        expect(orderData.OrderDirection).toBe("Desc");
    });

    it("Given sort descending when clicked then sort by field cleared", () => {
        let orderData = { OrderField: "ThisField", OrderDirection: "Desc" };
        const wrapper = shallow(<SortHeader
                                    headerText="__header__"
                                    orderData={orderData}
                                    orderField="ThisField"
                                    orderChanged={() => { }} />);
        const instance = wrapper.instance() as any;

        wrapper.simulate('click');

        expect(wrapper.html()).not.toContain("fa-sort-alpha-asc");
        expect(wrapper.html()).not.toContain("fa-sort-alpha-desc");

        expect(orderData.OrderField).toBe("ThisField");
        expect(instance.state.direction).toBe("None");
        expect(orderData.OrderDirection).toBe("None");
    });
});