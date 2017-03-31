import React from 'react';

import { SplashScreen } from 'components/SplashScreen';
import { SelectMenu } from 'components/common/ui/SelectMenu';
import { setCookie } from 'utilities/cookieHelpers';
import { OpenstackLoginForm } from '../../../troposphere/static/js/components/login/OpenstackLoginForm';
//import OpenstackLoginForm from "../../../troposphere/static/js/components/login/OpenstackLoginForm.jsx";
//import { stores } from 'stores';
//import { ProviderStore } from '../../../troposphere/static/js/stores/ProviderStore'


jest.mock('components/SplashScreen',() => { return { SplashScreen: { } }; });
jest.mock('components/common/ui/SelectMenu',() => { return { SelectMenu: { } }; });
jest.mock('utilities/cookieHelpers',() => { return { setCookie: { } }; });
//jest.mock('../../../troposphere/static/js/stores/ProviderStore',() => { return {ProviderStore: { getAll: jest.fn() } } } );

//ProviderStore = require('../../../troposphere/static/js/stores/ProviderStore').default;
//ProviderStore.prototype.getAll = jest.genMockFn();
//ProviderStore.prototype.getAll.mockImplementation(function () { return("MOC"); } );

function mockOpenstackLoginForm() {
    const OpenstackLoginForm = React.createElement(require.requireActual("../../../troposphere/static/js/components/login/OpenstackLoginForm"));
    return {
        ...OpenstackLoginForm
    }
}

jest.mock('../../../troposphere/static/js/components/login/OpenstackLoginForm', () => { return mockOpenstackLoginForm(); })

describe("Openstack login form test", function() {
    var ReactTestUtils = require('react-addons-test-utils');
    var LoginForm = React.createElement(require.requireMock("../../../troposphere/static/js/components/login/OpenstackLoginForm"));
    it("Checking the title", function() {
        var title = "Login";
        //var LoginForm = React.createElement(OpenstackLoginForm);
        //LoginForm.attemptLogin();
        //LoginForm.updateState = jest.fn();
        var login = ReactTestUtils.renderIntoDocument(LoginForm);
        var login_title = ReactTestUtils.findRenderedDOMComponentWithTag(login, "h1");
        expect(login_title.textContent).toBe(title);
    });
});


