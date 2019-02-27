import React from 'react';
import { shallow } from 'enzyme';
import expect from "expect";
import {Menu} from "antd";


import Header from './components/Header';

it('renders headers', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.contains(<Menu.Item/>)).toEqual(true);
});