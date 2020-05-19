import React from "react";
import { create } from "react-test-renderer";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
	it("should render without value", () => {
		const component = create(<Checkbox />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should render with value", () => {
		const component = create(<Checkbox value="My custom value" />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should render with value and checked option", () => {
		const component = create(
			<Checkbox value="My custom value" checked={false} />
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
});
