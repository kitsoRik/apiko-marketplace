import React from 'react';
import { create } from 'react-test-renderer';
import DialogTitle from './DialogTitle';


describe("Dialog", () => {
    it("should render with value", () => {
        const component = create(<DialogTitle value="My custom title" />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
    it("should render without value", () => {
        const component = create(<DialogTitle />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with className", () => {
        const component = create(<DialogTitle className="my-custom-class-name" />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
});