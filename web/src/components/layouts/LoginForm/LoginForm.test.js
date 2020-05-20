import React from "react";
import { create } from "react-test-renderer";
import LoginForm from "./LoginForm";
import LoginUpperContainer from "./LoginUpperContainer/LoginUpperContainer";
import LoginLowerContainer from "./LoginLowerContainer/LoginLowerContainer";

describe("LoginForm", () => {
	it("should be rendered", () => {
		const component = create(<LoginForm></LoginForm>);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should render with upper container", () => {
		const component = create(
			<LoginForm>
				<LoginUpperContainer>...</LoginUpperContainer>
			</LoginForm>
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should render with lower container", () => {
		const component = create(
			<LoginForm>
				<LoginLowerContainer>...</LoginLowerContainer>
			</LoginForm>
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should render with both containers", () => {
		const component = create(
			<LoginForm>
				<LoginUpperContainer>...</LoginUpperContainer>
				<LoginLowerContainer>...</LoginLowerContainer>
			</LoginForm>
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should render the loading", () => {
		const component = create(<LoginForm loading={true}></LoginForm>);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should render the loading with containers", () => {
		let component = create(
			<LoginForm loading={true}>
				<LoginUpperContainer>...</LoginUpperContainer>
			</LoginForm>
		);
		let json = component.toJSON();

		expect(json).toMatchSnapshot();

		component = create(
			<LoginForm loading={true}>
				<LoginLowerContainer>...</LoginLowerContainer>
			</LoginForm>
		);
		json = component.toJSON();

		expect(json).toMatchSnapshot();

		component = create(
			<LoginForm loading={true}>
				<LoginUpperContainer>...</LoginUpperContainer>
				<LoginLowerContainer>...</LoginLowerContainer>
			</LoginForm>
		);
		json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
});
