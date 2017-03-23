import React from "react";

export default React.createClass({
    displayName: "SSHCreateView",

    getInitialState: function() {
        return {
            keyName: "",
            publicKey: "",
            showValidation: false
        };
    },

    validateName: function () {
        let name = this.state.keyName;
        let hasError = false;
        let message = "";
        let maxCharLen = 60;

        if (name === "") {
            hasError = true;
            message = "This field is required";
        }

        if (name.length > maxCharLen) {
            hasError = true;
            message = `Must be less than ${maxCharLen} characters long`;
        }

        return {
            hasError,
            message
        }
    },

    validatePublicKey: function () {
        let pubKey = this.state.publicKey;
        let parts = pubKey.split(/\s+/g)
        let hasError = false;
        let message = "";


        if (pubKey === "") {
            hasError = true;
            message = "This field is required";
        }

        if (!this.validateKeyType(parts[0])) {
            hasError = true;
            message = "Public key must begin with either ssh-rsa, ssh-dss, ecdsa-sha2-nistp256, or ssh-ed25519";
        }

        return {
            hasError,
            message
        }
    },

    validateKeyType: function(firstWord) {
        return /^(ssh-dss|ecdsa-sha2-nistp256|ssh-ed25519|ssh-rsa)$/.test(firstWord);
    },

    validateKey: function() {
        let parts = this.state.pubKey.split(/\s+/g);
        return this.validateKeyType(parts[0])
    },

    isSubmittable: function () {
        if (!this.validateName().hasError && !this.validatePublicKey().hasError) {
            return true;
        }

        return false;
    },

    cancel: function() {
        this.hide();
    },

    confirm: function() {
        if (this.isSubmittable()) {
            this.props.onConfirm(this.state.keyName.trim(),
                                 this.state.publicKey.trim());
        }
        this.setState({
            showValidation: true
        });
    },

    onNameChange: function(e) {
        this.setState({
            keyName: e.target.value
        });
    },

    onNameBlur: function () {
        let keyName = this.state.keyName.trim();
        this.setState({
            keyName
        });
    },

    onPublicKeyChange: function(e) {
        this.setState({
            publicKey: e.target.value
        });
    },

    renderBody: function() {
        let keyName = this.state.keyName;
        let nameClassNames = "form-group";
        let nameErrorMessage = null;
        let descriptionClassNames = "form-group";
        let descriptionErrorMessage = null;

        if (this.state.showValidation) {
            nameClassNames = this.validateName().hasError ?
                "form-group has-error" : null;
            nameErrorMessage = this.validateName().message;
            descriptionClassNames = this.validatePublicKey().hasError ?
                "form-group has-error" : null;
            descriptionErrorMessage = this.validatePublicKey().message;
        }

        return (
        <div role="form">
            <div className={nameClassNames}>
                <label htmlFor="project-name">
                    Key Name
                </label>
                <input type="text"
                    className="form-control"
                    value={keyName}
                    onChange={this.onNameChange}
                    onBlur={this.onNameBlur} />
                <span className="help-block">{nameErrorMessage}</span>
            </div>
            <div className={descriptionClassNames}>
                <label htmlFor="project-description">
                    Public Key
                </label>
                <textarea placeholder="Begins with either ssh-rsa, ssh-dss, ..."
                    type='text'
                    className="form-control"
                    rows="7"
                    value={this.state.publicKey}
                    onChange={this.onPublicKeyChange} />
                <span className="help-block">{descriptionErrorMessage}</span>
            </div>
        </div>
        );
    },

    render: function() {
        let isSubmittable = true;
        if (this.state.showValidation) {
            if (!this.isSubmittable()) {
                isSubmittable = false
            }
        }
        return (
        <div>
            {this.renderBody()}
            <div className="modal-footer">
                <button id="cancelCreateProject"
                    type="button"
                    className="btn btn-default"
                    onClick={this.props.cancel}>
                    Cancel
                </button>
                <button id="submitCreateProject"
                    type="button"
                    className="btn btn-primary"
                    onClick={this.confirm}
                    disabled={!isSubmittable}>
                    Create
                </button>
            </div>
        </div>
        );
    }
});
