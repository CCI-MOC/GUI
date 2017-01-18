import actions from "actions";
import ModalHelpers from "components/modals/ModalHelpers";
import LoginModal from "components/modals/login/LoginModal.react";

export default {

    doLogin: function(initialUsername, initialPassword, project) {
        var props = {
            initialUsername,
            initialPassword,
            project
        };

        ModalHelpers.renderModal(LoginModal, props, function(username, password) {
            actions.LoginActions.doLogin({
                Username: username,
                Password: password,
                project: project
            });
        });
    }
};
