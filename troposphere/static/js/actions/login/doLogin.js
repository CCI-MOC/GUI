import ExternalLinkConstants from "constants/ExternalLinkConstants";
import Login from "models/Login";
import actions from "actions";
import Utils from "../Utils";

export default {

    doLogin: function(payload) {

        if (!payload.Username)
            throw new Error("Missing Username");
        if (!payload.Password)
            throw new Error("Missing Password");

        var username = payload.Username,
            password = payload.Password;

        var login = new Login({
            Username: username,
            Password: password
        });

        // Add the external_link optimistically
        Utils.dispatch(
            ExternalLinkConstants.ADD_LINK,
            {
                external_link: login
            },
            {
                silent: false
            });

        login.save().done(function(response) {
            //Utils.dispatch(
            //    ExternalLinkConstants.UPDATE_LINK,
            //   {
            //        external_link: login
            //    },
            //    {
            //        silent: false
            //    });
            
            //Utils.displayError({
            //    title: "Got Here",
            //    response: response.token
            //});
            window.location="/login?redirect_to=" + window.location.pathname + 
                                   "&Username=" + response.username +
                                   "&identity_uuid=" + response.identity_uuid +
                                   "&identity_id=" + response.identity_id +
                                   "&KeystoneToken=" + response.token +
                                   "&project_list=" + response.project_list;  
        }).fail(function(response) {
            //Utils.dispatch(
            //    ExternalLinkConstants.REMOVE_LINK,
            //    {
            //        external_link: login
            //    },
            //    {
            //        silent: false
            //    });
            Utils.displayError({
                title: "Wrong Credentials, please try again",
                response: response
            });
        });    
    }
};
