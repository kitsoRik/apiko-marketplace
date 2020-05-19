import React from "react";
import { create } from "react-test-renderer";
import MartiniqueButton from "./MartiniqueButton";
import { mount, shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("MartiniqueButton", () => {
	it("should render without value", () => {
		const component = create(<MartiniqueButton />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with value", () => {
		const component = create(<MartiniqueButton value="My custom value" />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render disabled", () => {
		const component = create(
			<MartiniqueButton value={"My custom calue"} disabled={true} />
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should have class", () => {
		const component = mount(<MartiniqueButton />);
		expect(component.find("button").hasClass("button-martinique")).toEqual(
			true
		);
	});

	it("should skip click event", () => {
		const onClick = jest.fn();
		const component = mount(
			<MartiniqueButton onClick={onClick} disabled={true} />
		);
		component.find("button").simulate("click");
		expect(onClick).toBeCalledTimes(0);
	});

	it("should emit click event", () => {
		const onClick = jest.fn();
		const component = mount(<MartiniqueButton onClick={onClick} />);
		const button = component.find("button");

		button.simulate("click");
		expect(onClick).toBeCalledTimes(1);
		button.simulate("click");
		expect(onClick).toBeCalledTimes(2);
	});
});
