import $ from "jquery";
import globals from "globals";
import { findCookie } from "utilities/cookieHelpers";

export default {

    authSuccess: function(response, data, onSuccess, project_name, provider) {
        /**
         * UI authentication. This is what happens after the Keystone authorizes the user.
         */
        let token = response.token,
            username = response.username;
        let tropoLoginUrl = globals.API_V2_ROOT.replace("/api/v2","/login");
        $.ajax(tropoLoginUrl, {
                type: "POST",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                success: function(response) {
                    let token = response.token,
                        username = response.username;

                    if(onSuccess != null) {
                        onSuccess(username, token, project_name, provider);
                    }
                },
                error: function(response) {
                    var response_errors = response.responseJSON.errors;
                    if(onFailure != null) {
                        onFailure(response_errors[0].message);
                    }
                }
            });
        return;
    },

    attemptLogin: function(username, password, project_name, provider, onSuccess, onFailure) {
        var data = {};

        // var CSRFToken = findCookie("tropo_csrftoken");
        // data["csrfmiddlewaretoken"] = CSRFToken;
        // Prepare POST data
        data["username"] = username;
        data["password"] = password;
        data["project_name"] = project_name;
        data["auth_url"] = provider != null ? provider.get('auth_url') : '';
        let authUrl = globals.API_V2_ROOT.replace("/api/v2","/auth");
        let self = this;
        $.ajax(authUrl, {
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(response) {
                self.authSuccess(response, data, onSuccess, project_name, provider)
            },
            error: function(response) {
                var response_errors = response.responseJSON.errors;
                if(onFailure != null) {
                    onFailure(response_errors[0].message);
                }
            }
        });

    }
};
