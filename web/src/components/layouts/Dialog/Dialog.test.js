import React from "react";
import { create } from "react-test-renderer";
import Dialog from "./Dialog";
import DialogTitle from "./DialogTitle";

describe("Dialog", () => {
	it("should render without children", () => {
		const component = create(<Dialog />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should render with title", () => {
		const component = create(
			<Dialog>
				<DialogTitle />
			</Dialog>
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should render with title and content", () => {
		const component = create(
			<Dialog>
				<DialogTitle />
				<div>Content</div>
			</Dialog>
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should render with content", () => {
		const component = create(
			<Dialog>
				<div>Content</div>
			</Dialog>
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
});
