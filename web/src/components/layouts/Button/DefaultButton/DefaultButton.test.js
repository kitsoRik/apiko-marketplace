import React from 'react';
import DefaultButton from '../DefaultButton';
import renderer from 'react-test-renderer';

test('Default button', () => {
    const component = renderer.create(
        <DefaultButton value="123" />,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


    tree.props.value = "Hello";
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();


    tree.props.disabled = true;
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();


    tree.props.disabled = false;
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.className = "My custom class name";
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.style = { width: '50px' };
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});