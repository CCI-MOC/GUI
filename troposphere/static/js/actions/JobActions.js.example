import $ from "jquery";
import NotificationController from "controllers/NotificationController";
import globals from "globals";
import Badges from "Badges";
import Utils from "./Utils";
import Constants from "constants/ClusterLaunchConstants";
import actions from "actions";
import Cluster from "models/Cluster";


export default {

    clusterLaunch: function(params) {
        if (!params.pluginName)
            throw new Error("Missing Plugin Name");
        if (!params.clusterName)
            throw new Error("Missing Cluster Name");


        var identity = params.identity,
            pluginName = params.pluginName,
            clusterName = params.clusterName;

        let cluster = new Cluster({
            identity: identity,
            pluginName: pluginName,
            clusterName: clusterName,
            clusterStatus: "building" 
        });
            
        Utils.dispatch(Constants.ADD, {
            cluster: cluster
        });
        
        var data = {
            identity: identity,
            pluginName: pluginName,
            clusterName: clusterName,
        };


        var requestUrl = globals.API_V2_ROOT + "/sahara_cluster";

        $.ajax(requestUrl, {
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(data) {
                NotificationController.info("Cluster Launched");
                cluster.set({clusterStatus: 'launched'});
                Utils.dispatch(Constants.UPDATE, {
                    cluster:cluster
                });
            },
            error: function(response) {
                var errorMessage,
                    response_error = response.responseJSON.detail;
                if (response.status >= 500) {
                    errorMessage = "This is a >=500 error. Please contact Lucas";
                } else {
                    errorMessage = "There was an error launching your cluster: " + response_error;
                }
                NotificationController.error("Launch Cluster error", errorMessage);
            }
        });
    }

};
