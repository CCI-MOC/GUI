import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

describe("Login Header", () => {
  var ReactTestUtils = require('react-addons-test-utils'),
      LoginHeader = React.createFactory(require('./LoginHeader.jsx'));

  it("should render without any error", () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginHeader />, div);
  });
  it("snapshot test", () => {
    const tree = renderer.create(
      <LoginHeader />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
