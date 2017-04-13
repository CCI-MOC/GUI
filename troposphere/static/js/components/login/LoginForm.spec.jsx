import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

describe("Login Form", () => {
  var ReactTestUtils = require('react-addons-test-utils'),
      LoginForm = React.createFactory(require('./LoginForm.jsx'));

  it("should render without any error", () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginForm />, div);
  });
  it("snapshot test", () => {
    const tree = renderer.create(
      <LoginForm />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
