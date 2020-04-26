import React from 'react';
import { create } from 'react-test-renderer';
import ComboboxOption from './ComboboxOption';


describe("ComboboxOption", () => {
    it("should render without value and text", () => {
        const component = create(<ComboboxOption></ComboboxOption>);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with value and text", () => {
        const component = create(<ComboboxOption value="value">text</ComboboxOption>);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
});