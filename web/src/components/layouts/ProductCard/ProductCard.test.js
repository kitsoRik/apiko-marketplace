import React from 'react';
import { create } from 'react-test-renderer';
import ProductCard from '.';


describe("Label", () => {
    it("should be rendered", () => {
        const component = create(
            <ProductCard
                className="my-custom-class-name"
                id={0}
                title="My custom title"
                price={55.07}
                iconName={"http://..."} />
        );
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
    it("should render with saved state", () => {
        const component = create(
            <ProductCard
                className="my-custom-class-name"
                id={0}
                title="My custom title"
                price={55.07}
                saved={true}
                iconName={"http://..."} />
        );
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
    it("should render with changing saved state", () => {
        const component = create(
            <ProductCard
                className="my-custom-class-name"
                id={0}
                title="My custom title"
                price={55.07}
                saved={true}
                changingSaveState={true}
                iconName={"http://..."} />
        );
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
});