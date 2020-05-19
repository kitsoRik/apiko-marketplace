import React from "react";
import { create } from "react-test-renderer";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
describe("Menu", () => {
    it("should be rendered", () => {
        const component = create(<Menu></Menu>);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
    it("should render with action", () => {
        const component = create(
            <Menu>
                <MenuItem value="Custom value" />
            </Menu>
        );
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
    it("should render with action", () => {
        const component = create(
            <Menu>
                <MenuItem value="Custom value" />
                <MenuItem value="Custom value" />
            </Menu>
        );
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
});
