import React from "react";
import { create } from "react-test-renderer";
import ModalDialog from "./ModalDialog";
import { mount } from "enzyme";

describe("ModalDialog", () => {
    it("should be rendered", () => {
        const component = create(<ModalDialog></ModalDialog>);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
    it("should render with children", () => {
        const component = create(<ModalDialog><div><span></span></div></ModalDialog>);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
    it("should render opened", () => {
        const component = create(
            <ModalDialog onClosed={() => { }} opened={true}>
                <div>
                    <span></span>
                </div>
            </ModalDialog>);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
    it("should render closed", () => {
        const component = create(
            <ModalDialog onClosed={() => { }} opened={false}>
                <div>
                    <span></span>
                </div>
            </ModalDialog>);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
    it("should render with style", () => {
        const component = create(
            <ModalDialog style={{}}>
                <div>
                    <span></span>
                </div>
            </ModalDialog>);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
    it("should render with classname", () => {
        const component = create(
            <ModalDialog className="custom-class-name">
                <div>
                    <span></span>
                </div>
            </ModalDialog>);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
    it("should render the loading with children", () => {
        const onClosed = jest.fn();
        const component = mount(<ModalDialog onClosed={onClosed} opened={true}><div><span></span></div></ModalDialog>);

        expect(onClosed).toBeCalledTimes(0);
        component.find("div").first().simulate("click");
        expect(onClosed).toBeCalled();
    });
});
