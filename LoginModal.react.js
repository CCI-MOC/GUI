import React from "react";
import $ from "jquery";
import BootstrapModalMixin from "components/mixins/BootstrapModalMixin.react";
import { trackAction } from "../../../utilities/userActivity";


export default React.createClass({
    displayName: "LoginModal",

    mixins: [BootstrapModalMixin],

    propTypes: {
        initialUsername: React.PropTypes.string.isRequired,
        initialPassword: React.PropTypes.string.isRequired,
        onConfirm: React.PropTypes.func.isRequired
    },

    //
    // Mounting & State
    // ----------------
    //

    getInitialState: function() {
        return {
            Username: this.props.initialUsername,
            Password: this.props.initialPassword,
            shouldValidate: false
        }
    },

    //
    // Internal Modal Callbacks
    // ------------------------
    //

    cancel: function() {
        this.hide();
    },

    confirm: function() {
        if (!this.isSubmittable()) {
            this.setState({
                shouldValidate: true
            }); return
        }
        this.hide();
        this.props.onConfirm(
            $.trim(this.state.Username),
            this.state.Password,
        );
    },

    //
    // Custom Modal Callbacks
    //

    onUsernameChange: function(e) {
        let newUsername = e.target.value;
        this.setState({
            Username: newUsername
        });
    },

    onPasswordChange: function(e) {
        let newPassword = e.target.value;
        this.setState({
            Password: newPassword 
        });
    },

    //
    // Modal Validation
    // ------------------
    //

    validateUsername: function() {
        let Username = this.state.Username;
        if (!Username.length) {
            return {
                valid: false,
                cause: "empty"
            }
        }
        return {
            valid: true,
            cause: ""
        }
    },

    validatePassword: function() {
        let Password = this.state.Password;
        if (!Password.length) {
            return {
                valid: false,
                cause: "empty"
            }
        }
        return {
            valid: true,
            cause: ""
        }
    },

    isSubmittable: function() {
        let username = this.validateUsername().valid;
        let password = this.validatePassword().valid;
        return username && password;
    },

    errorMessages: function() {
        //Username Messages
        let username = this.validateUsername;
        let usernameMessage;
        if (!username().valid) {
            if (username().cause === "empty") {
                usernameMessage = "Enter Usersname";
            }
        }
        //Password Messages
        let password = this.validatePassword;
        let passwordMessage;
        if (!password().valid) {
            if (password().cause === "empty") {
                passwordMessage = "Enter Usersname";
            }
        }

        return {
            usernameMessage,
            passwordMessage,
        }
    },

    //
    // Render
    // ------
    //

    renderBody: function() {
        let formattedTitleError;
        let formattedDescriptionError;
        let formattedLinkError;
        if (!this.isSubmittable() && this.state.shouldValidate) {
            formattedTitleError = (
                <p className="no-results text-danger">
                    {this.errorMessages().usernameMessage}
                </p>
            );

            formattedDescriptionError = (
                <p className="no-results text-danger">
                    {this.errorMessages().passwordMessage}
                </p>
            );
        }

        let requiredLabel = ( <span style={{ color: "red" }}>*</span> );

        return (
        <div className="clearfix" style={{ marginBottom: "50px" }} role="form">
            <div className="form-group">
                <label htmlFor="linkName">
                    Username
                    {requiredLabel}
                </label>
                <input type="text"
                    className="form-control"
                    value={this.state.Username}
                    onChange={this.onUsernameChange} />
                {formattedTitleError}
            </div>
            <div className="form-group">
                <label htmlFor="linkSize">
                    Password 
                    {requiredLabel}
                </label>
                <input type="password" 
                    id="project-description"
                    className="form-control"
                    value={this.state.Password}
                    onChange={this.onPasswordChange} />
                {formattedDescriptionError}
            </div>
            <div style={{ float: "right" }}>
                {requiredLabel} Required
            </div>
        </div>
        );
    },

    render: function() {
        let footerErrorText;

        if (!this.isSubmittable() && this.state.shouldValidate) {
            footerErrorText = (
                <p className="text-danger">
                    Unable to Login.
                </p>
            );
        }

        let isDisabled = false;
        if (this.state.shouldValidate) {
            if (!this.isSubmittable()) {
                isDisabled = true;
            }
        }
        return (
        <div className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {this.renderCloseButton()}
                        <h1 className="t-title">Login to MOC</h1>
                    </div>
                    <div className="modal-body">
                        {this.renderBody()}
                    </div>
                    <div className="modal-footer">
                        {footerErrorText}
                        <button type="button" className="btn btn-danger" onClick={this.cancel}>
                            Cancel
                        </button>
                        <button type="button"
                            className="btn btn-primary"
                            onClick={this.confirm}
                            disabled={isDisabled}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
});
