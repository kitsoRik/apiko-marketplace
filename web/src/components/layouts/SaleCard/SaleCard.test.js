import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';
import SaleCard from './SaleCard';


describe("Label", () => {
    it("should be rendered", () => {
        const component = create(<SaleCard />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
    it("should throw error with product=null", () => {
        const component = () => mount(<SaleCard product={null} />);

        expect(component).toThrowError();
    });
    it("should throw error with user=null", () => {
        const component = () => mount(<SaleCard user={null} />);

        expect(component).toThrowError();
    });
});