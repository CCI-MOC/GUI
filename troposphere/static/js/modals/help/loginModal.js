import actions from "actions";
import ModalHelpers from "components/modals/ModalHelpers";
import LoginModal from "components/modals/LoginModal.react";

export default {

    LoginModal: function() {
        ModalHelpers.renderModal(LoginModal, null, function(identity, quota, reason) {
            //actions.HelpActions.requestMoreResources({
            //    identity,
            //    quota,
            //    reason
            //});
        });
    }

};
