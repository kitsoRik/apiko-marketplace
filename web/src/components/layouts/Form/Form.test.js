import React from "react";
import { create } from "react-test-renderer";
import Form from "./Form";

describe("Form", () => {
	it("should rendered", () => {
		const component = create(<Form></Form>);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with children", () => {
		const component = create(<Form>Children</Form>);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with className", () => {
		const component = create(
			<Form className="my-custom-class-name">Children</Form>
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
});
