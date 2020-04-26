import React from 'react';
import { create } from 'react-test-renderer';
import FeedbackCard from './FeedbackCard';


describe("FeedbackCard", () => {
    it("should rendered", () => {
        const component = create(<FeedbackCard />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with rate", () => {
        const component = create(<FeedbackCard rate={4.5} />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it("should render with text", () => {
        const component = create(<FeedbackCard text={"My custom text"} />);
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });
});