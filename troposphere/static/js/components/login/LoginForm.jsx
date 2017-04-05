import React from "react";
import Backbone from "backbone";
import SelectMenu from "components/common/ui/SelectMenu";

export default React.createClass({
    propTypes: {
        provider: React.PropTypes.instanceOf(Backbone.Model),
        providerList: React.PropTypes.instanceOf(Backbone.Collection),
        usernameClasses: React.PropTypes.string,
        passwordClasses: React.PropTypes.string,
        projectNameClasses: React.PropTypes.string,
        errorMessage: React.PropTypes.string,
        username: React.PropTypes.string,
        password: React.PropTypes.string,
        projectName: React.PropTypes.string,
        onEnterPressed: React.PropTypes.func,
        onUsernameChange: React.PropTypes.func,
        onPasswordChange: React.PropTypes.func,
        onProjectNameChange: React.PropTypes.func,
        onProviderChange: React.PropTypes.func,
    },
        render: function() {
        let renderLoginOrLoadingFunc = this.props.renderLoginOrLoadingFunc;
        let {provider, providerList, usernameClasses, passwordClasses, projectNameClasses, errorMessage, username, password, projectName, onEnterPressed, onUsernameChange, onPasswordChange, onProjectNameChange, onProviderChange, renderLoginOrLoading} = this.props;
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
                        value={username}
                        onChange={onUsernameChange}
                        onKeyPress={onEnterPressed}
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
                        value={password}
                        onChange={onPasswordChange}
                        onKeyPress={onEnterPressed}
                        />
                </div>
                <div className={projectNameClasses}>
                    <label htmlFor="projectName">
                        projectName
                    </label>
                    <input required
                        type="text"
                        className="form-control"
                        id="projectName"
                        value={projectName}
                        onChange={onProjectNameChange}
                        onKeyPress={onEnterPressed}
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
                                onSelect={ onProviderChange } />
                </div>
                <div className="login-screen-footer modal-footer">
                    <span className="help-block">{errorMessage}</span>
                    {renderLoginOrLoadingFunc}
                </div>
            </form>
        );
    }
});
