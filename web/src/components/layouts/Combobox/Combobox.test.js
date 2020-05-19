import React from "react";
import { create } from "react-test-renderer";
import Combobox from "./Combobox";
import ComboboxOption from "./ComboboxOption/ComboboxOption";

describe("Combobox", () => {
	it("should render without options", () => {
		const component = create(<Combobox></Combobox>);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});

	it("should render with options", () => {
		const component = create(
			<Combobox value="1">
				<ComboboxOption value="1">Hello</ComboboxOption>
				<ComboboxOption value="2">World</ComboboxOption>
			</Combobox>
		);
		const json = component.toJSON();

		expect(json).toMatchSnapshot();
	});
});
