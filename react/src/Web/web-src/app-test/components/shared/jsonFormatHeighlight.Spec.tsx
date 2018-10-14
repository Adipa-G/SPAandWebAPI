declare var JSON: any;

import * as React from 'react';
import { shallow } from 'enzyme';

import { JsonFormatHeighlight } from "../../../app/components/shared/jsonFormatHeighlight";

describe("<JsonFormatHeighlight/>", () => {
    it("should render when valid json", () => {
        let text: string = JSON.stringify({name : "fruits",values : ["mango","banana"]});
        const wrapper = shallow(<JsonFormatHeighlight text={text} />);

        expect(wrapper.html()).toContain('<pre>');
        expect(wrapper.html()).toContain('fruits');
        expect(wrapper.html()).toContain('mango');
        expect(wrapper.html()).toContain('banana');
        expect(wrapper.html()).toContain('hljs-attr');
        expect(wrapper.html()).toContain('hljs-string');
    });

    it("should fallback render when invalid json", () => {
        let text: string = "[" + JSON.stringify({ name: "fruits", values: ["mango", "banana"] });
        const wrapper = shallow(<JsonFormatHeighlight text={text} />);

        expect(wrapper.html()).toContain('<pre>');
        expect(wrapper.html()).toContain('fruits');
        expect(wrapper.html()).toContain('mango');
        expect(wrapper.html()).toContain('banana');
        expect(wrapper.html()).not.toContain('hljs-attr');
        expect(wrapper.html()).not.toContain('hljs-string');
    });
});