import React from "react";
import { create } from "react-test-renderer";
import DefaultButton from "./DefaultButton";
import { mount } from "enzyme";

describe("Default button", () => {
	it("should render without value", () => {
		const component = create(<DefaultButton />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with value", () => {
		const component = create(<DefaultButton value="My custom value" />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render disabled", () => {
		const component = create(
			<DefaultButton value={"My custom calue"} disabled={true} />
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should have class", () => {
		const component = mount(<DefaultButton />);
		expect(component.find("button").hasClass("button-default")).toEqual(
			true
		);
	});

	it("should skip click event", () => {
		const onClick = jest.fn();
		const component = mount(
			<DefaultButton onClick={onClick} disabled={true} />
		);
		component.find("button").simulate("click");
		expect(onClick).toBeCalledTimes(0);
	});

	it("should emit click event", () => {
		const onClick = jest.fn();
		const component = mount(<DefaultButton onClick={onClick} />);
		const button = component.find("button");

		button.simulate("click");
		expect(onClick).toBeCalledTimes(1);
		button.simulate("click");
		expect(onClick).toBeCalledTimes(2);
	});
});
