import React from 'react';
import { create } from 'react-test-renderer';
import InputImage from './InputImage';
import { mount } from 'enzyme';


describe("Label", () => {
    it("should be rendered", () => {
        const component = create(<InputImage />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with className", () => {
        const component = create(<InputImage className="my-custom-class-name" />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should emit setFile", () => {
        const setFile = jest.fn();
        const testFile = new Blob(["image"], { type: 'image/png' });

        const component = mount(<InputImage setFile={setFile} />);

        component.find("input").simulate("change", { target: { files: [testFile] } });

        expect(setFile).toBeCalledWith(testFile);
    });
});