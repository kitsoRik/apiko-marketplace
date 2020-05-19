import React from "react";
import { create } from "react-test-renderer";
import { mount, shallow } from "enzyme";
import UserIcon from ".";

describe("UserIcon", () => {
	it("should render without image", () => {
		const component = create(
			<UserIcon fullName="Pidburachynskyi Rostyslav" />
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should render with image", () => {
		const component = create(<UserIcon src="http://..." />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render have text PR", () => {
		const component = mount(
			<UserIcon fullName="Pidburachynskyi Rostyslav" />
		);
		expect(component.find("span").text()).toEqual("PR");
		expect(component.find("img").length).toEqual(0);
	});

	it("should render have img", () => {
		const component = mount(<UserIcon src="http://..." />);
		expect(component.find("span").length).toEqual(0);
		expect(component.find("img")).toBeTruthy();
	});
});
