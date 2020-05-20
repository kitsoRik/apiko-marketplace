import React from "react";
import { create } from "react-test-renderer";
import ModalLoading from "./ModalLoading";
import { mount } from "enzyme";

describe("ModalLoading", () => {
	it("should be rendered", () => {
		const component = create(<ModalLoading />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should render without darken", () => {
		const component = create(<ModalLoading darken={false} />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should render with classname", () => {
		const component = create(
			<ModalLoading className="custom=class-name" />
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should render without different size", () => {
		let component = create(<ModalLoading fillPercent={60} />);
		let json = component.toJSON();
		expect(json).toMatchSnapshot();

		component = create(<ModalLoading fillPercent={60} />);
		json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
});
