import React from "react";
import { create } from "react-test-renderer";
import Label from "./Label";

describe("Label", () => {
	it("should render without text", () => {
		const component = create(<Label />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with text", () => {
		const component = create(<Label value="My custom text" />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with text as h1", () => {
		const component = create(<Label value="My custom value" as="h1" />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with className", () => {
		const component = create(
			<Label value="My custom value" className="my-custom-class-name" />
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with error", () => {
		const component = create(<Label error="My custom error" />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with error if touched", () => {
		const component = create(
			<Label errorValueIfTouched="My custom error" />
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with children", () => {
		const component = create(
			<Label>
				<div>Children</div>
			</Label>
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with children and value", () => {
		const component = create(
			<Label value="My custom value">
				<div>Children</div>
			</Label>
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with children and error", () => {
		const component = create(
			<Label error="My custom value">
				<div>Children</div>
			</Label>
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with children and error if touched", () => {
		const component = create(
			<Label errorValueIfTouched="My custom value">
				<div>Children</div>
			</Label>
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
});
