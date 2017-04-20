import $ from "jquery";
import NotificationController from "controllers/NotificationController";
import globals from "globals";
import Badges from "Badges";
import Utils from "./Utils";
import Constants from "constants/JobLaunchConstants";
import actions from "actions";
import Job from "models/Job";


export default {

    jobLaunch: function(params) {
        if (!params.typeName)
            throw new Error("Missing Type Name");
        if (!params.jobName)
            throw new Error("Missing Job Name");


        var identity = params.identity,
            typeName = params.typeName,
            jobName = params.jobName;

        let job = new Job({
            identity: identity,
            typeName: typeName,
            jobName: jobName,
            jobStatus: "building" 
        });
            
        Utils.dispatch(Constants.ADD, {
            job: job 
        });
        
        var data = {
            identity: identity,
            typeName: typeName,
            jobName: jobName,
        };


        var requestUrl = globals.API_V2_ROOT + "/sahara_job";

        $.ajax(requestUrl, {
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(data) {
                NotificationController.info("Job Launched");
                job.set({jobStatus: 'launched'});
                Utils.dispatch(Constants.UPDATE, {
                    job: job
                });
            },
            error: function(response) {
                var errorMessage,
                    response_error = response.responseJSON.detail;
                if (response.status >= 500) {
                    errorMessage = "This is a >=500 error. Please contact Lucas";
                } else {
                    errorMessage = "There was an error launching your job: " + response_error;
                }
                NotificationController.error("Launch Job error", errorMessage);
            }
        });
    }

};
