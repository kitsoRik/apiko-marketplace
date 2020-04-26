import React from 'react';
import { create } from 'react-test-renderer';
import TextField from './TextField';

describe("TextField", () => {
    it("should render without text", () => {
        const component = create(<TextField />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with icon", () => {
        const component = create(<TextField icon={"1"} />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with text", () => {
        const component = create(<TextField value="My custom value" />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with text and icon", () => {
        const component = create(<TextField icon={"1"} value="My custom value" />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with placeholder", () => {
        const component = create(<TextField icon={"1"} placeholder="My custom placeholder" />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with placeholder and icon", () => {
        const component = create(<TextField icon={"1"} placeholder="My custom placeholder" />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with placeholder and text", () => {
        const component = create(
            <TextField
                value={"My custom value"}
                placeholder="My custom placeholder" />
        );
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with type=password", () => {
        const component = create(
            <TextField password={true} />
        );
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
});