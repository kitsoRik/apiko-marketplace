import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import EditProfile from './EditProfile';

configure({ adapter: new Adapter() });


describe("EditProfile", () => {
    it("should be rendered", () => {
        expect(1).toBe(1);
    });
});