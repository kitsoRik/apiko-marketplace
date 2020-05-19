import React from "react";
import { create } from "react-test-renderer";
import MenuItem from "./MenuItem";
import { mount } from "enzyme";
describe("MenuItem", () => {
    it("should be rendered", () => {
        const component = create(<MenuItem />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
    it("should render with value", () => {
        const component = create(<MenuItem value="Custom value" />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
    it("should render with accept event", () => {
        const component = create(<MenuItem onAccept={() => { }} />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should emit accept event", () => {
        const onAccept = jest.fn();
        const component = mount(<MenuItem _close={() => { }} onAccept={onAccept} />);
        const div = component.find("div");

        div.simulate("click");
        expect(onAccept).toBeCalledTimes(1);
        div.simulate("click");
        expect(onAccept).toBeCalledTimes(2);
    });
});
