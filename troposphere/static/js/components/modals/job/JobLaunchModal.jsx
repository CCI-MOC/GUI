import React from "react";
import BootstrapModalMixin from "components/mixins/BootstrapModalMixin";
import stores from "stores";
import globals from "globals";

export default React.createClass({
    displayName: "JobLaunchModal",

    mixins: [BootstrapModalMixin],

    getInitialState: function() {
        var identities = stores.IdentityStore.getAll();
        return {
            identity: identities ? identities.first().id : null,
            typeName: "",
            jobName: "",
            jobStatus: ""
        };
    },

    getState: function() {
        var identities = stores.IdentityStore.getAll(),
            identityId = null;

        if (identities) {
            identityId = this.state.identity ? this.state.identity : identities.first().id;
        }

        return {
            identity: identityId
        }
    },

    updateState: function() {
        if (this.isMounted()) this.setState(this.getState());
    },

    componentDidMount: function() {
        stores.IdentityStore.addChangeListener(this.updateState);
        stores.JobStore.addChangeListener(this.updateState);
    },

    componentWillUnmount: function() {
        stores.IdentityStore.removeChangeListener(this.updateState);
        stores.JobStore.removeChangeListener(this.getInitialState);
    },

    isSubmittable: function() {
        var hastypeName = !!this.state.typeName;
        var hasjobName = !!this.state.jobName;
        return hastypeName && hasjobName;
    },

    //
    // Internal Modal Callbacks
    // ------------------------
    //

    cancel: function() {
        this.hide();
    },

    addJob: function() {
        stores.JobStore.models.create({
            identity: this.state.identity,
            jobName: this.state.jobName,
            typeName: this.state.typeName,
        },  {
            success: function() {
                stores.JobStore.emitChange();
            },
        });
    },

    confirm: function() {
        // this.addJob();
        this.hide();
        this.props.onConfirm(this.state.identity, this.state.typeName, this.state.jobName, this.state.jobStatus);
    },

    //
    // Custom Modal Callbacks
    // ----------------------
    //

    // todo: I don't think there's a clusterName to update state unless
    // there's a risk of the component being re-rendered by the parent.
    // Should probably verify this behavior, but for now, we play it safe.
    handleIdentityChange: function(e) {
        this.setState({
            identity: Number(e.target.value)
        });
    },

    handletypeNameChange: function(e) {
        this.setState({
            typeName: e.target.value
        });
    },

    handlejobNameChange: function(e) {
        this.setState({
            jobName: e.target.value
        });
    },

    //
    // Render
    // ------
    //

    renderIdentity: function(identity) {
        return (
        <option key={identity.id} value={identity.id}>
            {identity.get("provider").name}
        </option>
        )
    },

    renderBody: function() {
        var identities = stores.IdentityStore.getAll(),
            username = stores.ProfileStore.get().get("username"),
            jobs = stores.JobStore.findJobsWhere({
                "created_by.username": username
            });

        if (username == null || jobs == null) {
            return <div className="loading"></div>;
        }

        if (!identities) return <div className="loading" />;

        return (
        <div role="form">
            <div className="form-group">
                <label htmlFor="project-name">
                    {"Type Name"}
                </label>

                <select className="form-control"    
                    value={this.state.typeName}
                    onChange={this.handletypeNameChange}>
                    <option>{"choose one"}</option>
                    <option>{"hive"}</option>
                    <option>{"pig"}</option>
                    <option>{"shell"}</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="project-description">
                    {"Job Name"}
                </label>
                <input type="text"
                    className="form-control"
                    placeholder="test-job"
                    value={this.state.jobName}
                    onChange={this.handlejobNameChange} />
            </div>
        </div>
        );
    },

    render: function() {
        return (
        <div className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {this.renderCloseButton()}
                        <h1 className="t-title">Launch a Job</h1>
                    </div>
                    <div className="modal-body">
                        {this.renderBody()}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.cancel}>
                            Cancel
                        </button>
                        <button type="button"
                            className="btn btn-primary"
                            onClick={this.confirm}
                            disabled={!this.isSubmittable()}>
                            Launch
                        </button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
});
