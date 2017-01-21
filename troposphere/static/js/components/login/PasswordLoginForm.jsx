mport React from "react";
import stores from "stores";
import SelectMenu from "components/common/ui/SelectMenu";

export default React.createClass({
    displayName: "PasswordLoginForm",

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
        let providerList = stores.ProviderStore.getAll();
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
        let project_name = this.state.project_name;

        this.setState({
            provider, providerList, showNewProvider,
            username, password, project_name});
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
            project_name: input
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
            this.state.project_name,
            this.state.provider,
            this.onLoginError)
    },

    onLoginError: function(error_message) {
        this.setState({
            error_message: error_message,
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
        var hasProjectName = !!this.state.project_name && this.state.project_name.length > 0;
        if(this.state.showNewProvider) {
            hasProjectName = true;
        }
        return hasUsername && hasPassword && hasProjectName && this.state.allowLogin == true;
    },
    onProviderChange: function(provider) {
        this.setState({provider:provider});
    },

    render: function() {
        let groupClasses = this.state.error_message != null ? "form-group has-error" : "form-group";
        let usernameClasses = groupClasses,
            passwordClasses = groupClasses,
            projectNameClasses = groupClasses,
            errorMessage = this.state.error_message != null ? "Login Failed: "+ this.state.error_message : null;
        let { provider, providerList} = this.state;

        //FIXME: Shamefully using modal-footer : Get css-help later
        return (
            <form>
                <div className={usernameClasses}>
                    <label htmlFor="username">
                        Username
                    </label>
                    <input required
                        type="name"
                        className="form-control"
                        id="username"
                        value={this.state.username}
                        ref="usernameInput"
                        onChange={this.onUsernameChange}
                        onKeyPress={this.onEnterPressed}
                        />
                </div>
                <div className={passwordClasses}>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input required
                        type="password"
                        className="form-control"
                        id="password"
                        value={this.state.password}
                        ref="passwordInput"
                        onChange={this.onPasswordChange}
                        onKeyPress={this.onEnterPressed}
                        />
                </div>
                <div className={projectNameClasses}>
                    <label htmlFor="projectName">
                        project name
                    </label>
                    <input required
                        type="text"
                        className="form-control"
                        id="projectName"
                        value={this.state.project_name}
                        ref="projectNameInput"
                        onChange={this.onProjectNameChange}
                        onKeyPress={this.onEnterPressed}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="provider">
                        Provider
                    </label>
                    <SelectMenu id="provider"
                                current={ provider }
                                optionName={ p => p.get("name") }
                                list={ providerList }
                                onSelect={ this.onProviderChange } />
                </div>
                <div className="login-screen-footer modal-footer">
                    <span className="help-block">{errorMessage}</span>
                    <button type="button"
                        className="btn btn-primary"
                        onClick={thomport React from "react";

export default React.createClass({
    displayName: "PasswordLoginForm",

    propTypes: {
        attemptLogin: React.PropTypes.func.isRequired,
    },

    //
    // Mounting & State
    // ----------------
    //

    getInitialState: function() {
        return {
            username: "",
            password: ""
        };
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
        this.props.attemptLogin(
            this.state.username,
            this.state.password,
            this.onLoginError)
    },

    onLoginError: function(error_message) {
        this.setState({
            error_message: error_message
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
        return hasUsername && hasPassword;
    },

    render: function() {
        let groupClasses = this.state.error_message != null ? "form-group has-error" : "form-group";
        let usernameClasses = groupClasses,
            passwordClasses = groupClasses,
            errorMessage = this.state.error_message != null ? "Login Failed: "+ this.state.error_message : null;

        //FIXME: Shamefully using modal-footer : Get css-help later
        return (
            <form>
                <div className={usernameClasses}>
                    <label htmlFor="username">
                        Username
                    </label>
                    <input required
                        type="name"
                        className="form-control"
                        id="username"
                        value={this.state.username}
                        ref="usernameInput"
                        onChange={this.onUsernameChange}
                        onKeyPress={this.onEnterPressed}
                        />
                </div>
                <div className={passwordClasses}>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input required
                        type="password"
                        className="form-control"
                        id="password"
                        value={this.state.password}
                        ref="passwordInput"
                        onChange={this.onPasswordChange}
                        onKeyPress={this.onEnterPressed}
                        />
                    <span className="help-block">{errorMessage}</span>
                </div>
                <div className="login-screen-footer modal-footer">
                    <button type="button"
                        className="btn btn-primary"
                        onClick={this.attemptLogin}
                        disabled={!this.isSubmittable()}>
                        Login
                    </button>
                </div>
            </form>
        );
    }

});
is.attemptLogin}
                        disabled={!this.isSubmittable()}>
                        Login
                    </button>
                </div>
            </form>
        );
    }

});
