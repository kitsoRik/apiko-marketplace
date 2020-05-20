import React from "react";
import { create } from "react-test-renderer";
import Pagination from "./Pagination";

describe("Pagination", () => {
	it("should be rendered", () => {
		const component = create(<Pagination />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
	it("should be rendered", () => {
		const component = create(<Pagination page={1} pages={10} />);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
});
