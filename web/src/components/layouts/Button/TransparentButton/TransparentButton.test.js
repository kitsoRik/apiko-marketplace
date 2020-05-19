import React from "react";
import { create } from "react-test-renderer";
import TransparentButton from "./TransparentButton";
import { mount } from "enzyme";

describe("TransparentButton", () => {
	it("should render without value", () => {
		const component = create(<TransparentButton />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with value", () => {
		const component = create(<TransparentButton value="My custom value" />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with className", () => {
		const component = create(
			<TransparentButton className="my-custom-class-name" />
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with darkMode=true", () => {
		const component = create(
			<TransparentButton value="My custom value" darkMode={true} />
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with darkMode=false", () => {
		const component = create(
			<TransparentButton value="My custom value" darkMode={false} />
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render disabled", () => {
		const component = create(
			<TransparentButton value="My custom value" disabled={true} />
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should skip click event", () => {
		const onClick = jest.fn();
		const component = mount(
			<TransparentButton
				value="My custom value"
				disabled={true}
				onClick={onClick}
			/>
		);
		component.find("button").simulate("click");
		expect(onClick).toBeCalledTimes(0);
	});

	it("should emit click event", () => {
		const onClick = jest.fn();
		const component = mount(
			<TransparentButton value="My custom value" onClick={onClick} />
		);

		const button = component.find("button");
		button.simulate("click");
		expect(onClick).toBeCalledTimes(1);
		button.simulate("click");
		expect(onClick).toBeCalledTimes(2);
	});
});
