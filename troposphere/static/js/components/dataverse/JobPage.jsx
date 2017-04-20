import React from "react";
import stores from "stores";
import globals from "globals";
import JobLaunchButton from "./JobLaunchButton";

export default React.createClass({
    displayName: "JobPage",

    getInitialState: function() {
        return {
            jobs: stores.JobStore.getAll(),
        };
    },

    updateState: function() {
        this.setState(this.getInitialState());
    },

    componentDidMount: function() {
        stores.JobStore.addChangeListener(this.updateState);
    },

    componentWillUnmount: function() {
        stores.JobStore.removeChangeListener(this.updateState);
    },

    style() {
        return {
            td: {
                wordWrap: "break-word",
                whiteSpace: "normal"
            }
        }
    },

    renderJobRow: function(job) {
        let { td } = this.style();
    },

    render: function() {
        var jobs = this.state.jobs;
        
        return (
        <div style={{ paddingTop: "50px" }} className="container">
            <h1 className="t-display-1">Jobs</h1>
            <div>
                <h2 className="t-title">Launch a job</h2>
                <JobLaunchButton />
            </div>
            <div>
                <table className="clearfix table" style={{ tableLayout: "fixed" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "30px"}}>Job Name</th>
                            <th style={{ width: "30px"}}>Job Type</th>
                            <th style={{ width: "30px"}}>Status</th>
                            <th style={{ width: "30px"}}></th>
                           
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    </table>
            </div>
        </div>
        );
    }
});
