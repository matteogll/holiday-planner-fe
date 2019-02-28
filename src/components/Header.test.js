import React from 'react';
import { shallow } from '../enzyme';
import expect from "expect";

import Header from './Header';

describe("Header component", () => {
    it('renders Menu.Item components', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find(".menu")).toBeDefined();
        expect(wrapper.find(".menu-item").length).toEqual(4);
    });
});
