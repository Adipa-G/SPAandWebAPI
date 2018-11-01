import * as React from 'react';
import { shallow } from 'enzyme';

import { TablePager } from "../../../app/components/shared/tablePager";

describe("<TablePager/>", () => {
    it("Given pager when render then render", () => {
        let pageData = { PageSize: 10, PageNumber: 5 };
        const wrapper = shallow(<TablePager
            totalCount={100}
            pageData={pageData}
            pageChanged={() => { }} />);

        expect(wrapper.html()).toContain("Previous");
        expect(wrapper.html()).toContain("3");
        expect(wrapper.html()).toContain("4");
        expect(wrapper.html()).toContain("5");
        expect(wrapper.html()).toContain("6");
        expect(wrapper.html()).toContain("7");
        expect(wrapper.html()).toContain("Next");
    });

    it("Given pager when clicked on previous then update the page number and call callback", () => {
        const callback = jest.fn();
        let pageData = { PageSize: 10, PageNumber: 5 };
        const wrapper = shallow(<TablePager
            totalCount={100}
            pageData={pageData}
            pageChanged={callback} />);

        var btn = wrapper.find("li a").at(0);
        btn.simulate("click");

        expect(btn.html()).toContain("Previous");
        expect(pageData.PageNumber).toBe(4);
        expect(callback).toHaveBeenCalled();
    });

    it("Given pager when clicked on page number then update the page number and call callback", () => {
        const callback = jest.fn();
        let pageData = { PageSize: 10, PageNumber: 5 };
        const wrapper = shallow(<TablePager
                                    totalCount={100}
                                    pageData={pageData}
                                    pageChanged={callback} />);

        var btn = wrapper.find("li a").at(5);
        btn.simulate("click");

        expect(btn.text()).toBe("7");
        expect(pageData.PageNumber).toBe(7);
        expect(callback).toHaveBeenCalled();
    });

    it("Given pager when clicked on next then update the page number and call callback", () => {
        const callback = jest.fn();
        let pageData = { PageSize: 10, PageNumber: 5 };
        const wrapper = shallow(<TablePager
                                    totalCount={100}
                                    pageData={pageData}
                                    pageChanged={callback} />);

        var btn = wrapper.find("li a").at(6);
        btn.simulate("click");

        expect(btn.html()).toContain("Next");
        expect(pageData.PageNumber).toBe(6);
        expect(callback).toHaveBeenCalled();
    });
});