import React from 'react';
import { create } from 'react-test-renderer';
import MartiniqueButton from './MartiniqueButton';


describe("MartiniqueButton", () => {
    it("should render without value", () => {
        const component = create(<MartiniqueButton />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with value", () => {
        const component = create(<MartiniqueButton value="My custom value" />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render disabled", () => {
        const component = create(<MartiniqueButton value={"My custom calue"} disabled={true} />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
});