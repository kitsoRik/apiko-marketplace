import React from 'react';
import { create } from 'react-test-renderer';
import TransparentButton from './TransparentButton';


describe("TransparentButton", () => {
    it("should render without value", () => {
        const component = create(<TransparentButton />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with value", () => {
        const component = create(<TransparentButton value="My custom value" />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with className", () => {
        const component = create(<TransparentButton className="my-custom-class-name" />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with darkMode=true", () => {
        const component = create(<TransparentButton value="My custom value" darkMode={true} />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with darkMode=false", () => {
        const component = create(<TransparentButton value="My custom value" darkMode={false} />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render disabled", () => {
        const component = create(<TransparentButton value="My custom value" disabled={true} />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
});