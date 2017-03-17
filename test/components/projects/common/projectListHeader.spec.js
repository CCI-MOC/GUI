import React from 'react';
import {shallow} from 'enzyme';

describe("Project List Header", function() {
    var ReactTestUtils = require('react-addons-test-utils'),
        ProjectListHeader = React.createFactory(require("/opt/dev/troposphere/troposphere/static/js/components/projects/common/ProjectListHeader")),
        title;
    it("should display the provided title", function() {
        title = "3" + "Projects"
        var header = ProjectListHeader({
            title: title
        });
        ProjectListHeader = ReactTestUtils.renderIntoDocument(header);
        var h1 = ReactTestUtils.findRenderedDOMComponentWithTag(ProjectListHeader, "h1");
        expect(h1.textContent).toBe(title);
    });
});
