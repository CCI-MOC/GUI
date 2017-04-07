import React from "react";
import Utils from "actions/Utils";
import stores from "stores";
import SelectMenu from "components/common/ui/SelectMenu";
import LoginForm from "./LoginForm";

export default React.createClass({
    displayName: "OpenstackLoginForm",

    propTypes: {
        attemptLogin: React.PropTypes.func.isRequired,
    },

    //
    // Mounting & State
    // ----------------
    //
    componentDidMount: function() {
        stores.ProviderStore.addChangeListener(this.updateState);
    },
    componentWillUnmount: function() {
        stores.ProviderStore.removeChangeListener(this.updateState);
    },
    updateState: function() {
        let providerList = stores.ProviderStore.getAll(); //TODO: If using multiple cloud-types, this login is *Openstack Only*
        let provider = this.state.provider;
        let showNewProvider = false;
        if(providerList == []) {
            showNewProvider = true;
        }
        if(provider == null && providerList && providerList.length != 0) {
            provider = providerList.first();
        }
        let username = this.state.username;
        let password = this.state.password;
        let projectName = this.state.projectName;

        this.setState({
            provider, providerList, showNewProvider,
            username, password, projectName});
    },

    getInitialState: function() {
        return {
            username: "",
            password: "",
            project_name: "",
            provider: null,
            allowLogin: true,
            providerList: stores.ProviderStore.getAll(),
            showNewProvider: false
        };
    },
    onProjectNameChange: function(e) {
        var input = e.target.value.trim();
        this.setState({
            projectName: input
        });
    },

    onUsernameChange: function(e) {
        var input = e.target.value.trim();
        this.setState({
            username: input
        });
    },

    onEnterPressed: function(e) {
        if (e.key === 'Enter' && this.isSubmittable()) {
            this.attemptLogin()
        }
    },

    attemptLogin: function() {
        this.setState({
            allowLogin: false,
        });
        this.props.attemptLogin(
            this.state.username,
            this.state.password,
            this.state.projectName,
            this.state.provider,
            this.onLoginError)
    },

    onLoginError: function(response) {
        let error_obj = Utils.displayError({response});
        this.setState({
            error_message: error_obj.message,
            allowLogin: true
        });
    },

    onPasswordChange: function(e) {
        var input = e.target.value;
        this.setState({
            password: input
        });
    },

    isSubmittable: function() {
        var hasUsername = !!this.state.username && this.state.username.length > 0;
        var hasPassword = !!this.state.password && this.state.password.length > 0;
        var canLogin = this.state.allowLogin == true;
        if(this.state.showNewProvider) {
            hasProjectName = true;
        }
        return hasUsername && hasPassword && canLogin;
    },
    onProviderChange: function(provider) {
        this.setState({provider:provider});
    },
    renderLoginOrLoading: function() {
        if(this.state.allowLogin == false) {
            return (<span className="loading-tiny-inline"></span>);
        } else {
            return (
                <button type="button"
                    className="btn btn-primary"
                    onClick={this.attemptLogin}
                    disabled={!this.isSubmittable()}>
                    {"Click to Login with Openstack"}
                </button>
            );
        }
    },
    render: function() {
        let groupClasses = this.state.error_message != null ? "form-group has-error" : "form-group";
        let usernameClasses = groupClasses,
            passwordClasses = groupClasses,
            projectNameClasses = groupClasses,
            errorMessage = this.state.error_message != null ? "Login Failed: "+ this.state.error_message : null;
        let { provider, providerList} = this.state;
        var renderLoginOrLoadingFunc = this.renderLoginOrLoading();

        return (
            <LoginForm {...{username: this.state.username,
                            password: this.state.password,
                            usernameClasses,
                            passwordClasses,
                            errorMessage,
                            renderLoginOrLoadingFunc,
                            onUsernameChange: this.onUsernameChange,
                            onPasswordChange: this.onPasswordChange,
                            onEnterPressed: this.onEnterPressed}} />
        );
    }
});
