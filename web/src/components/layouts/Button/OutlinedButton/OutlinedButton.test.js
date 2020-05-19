import React from "react";
import { create } from "react-test-renderer";
import OutlinedButton from "./OutlinedButton";

describe("OutlinedButton", () => {
	it("should render without value", () => {
		const component = create(<OutlinedButton />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with value", () => {
		const component = create(<OutlinedButton value="My custom value" />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with className", () => {
		const component = create(
			<OutlinedButton className="my-custom-class-name" />
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
});
