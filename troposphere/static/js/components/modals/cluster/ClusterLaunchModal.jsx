import React from "react";
import BootstrapModalMixin from "components/mixins/BootstrapModalMixin";
import stores from "stores";
import globals from "globals";

export default React.createClass({
    displayName: "ClusterLaunchModal",

    mixins: [BootstrapModalMixin],

    getInitialState: function() {
        var identities = stores.IdentityStore.getAll();
        return {
            identity: identities ? identities.first().id : null,
            pluginName: "",
            clusterName: "",
            clusterStatus: ""
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
        stores.ClusterStore.addChangeListener(this.updateState);
    },

    componentWillUnmount: function() {
        stores.IdentityStore.removeChangeListener(this.updateState);
        stores.ClusterStore.removeChangeListener(this.getInitialState);
    },

    isSubmittable: function() {
        var haspluginName = !!this.state.pluginName;
        var hasclusterName = !!this.state.clusterName;
        return haspluginName && hasclusterName;
    },

    //
    // Internal Modal Callbacks
    // ------------------------
    //

    cancel: function() {
        this.hide();
    },

    addCluster: function() {
        stores.ClusterStore.models.create({
            identity: this.state.identity,
            clusterName: this.state.clusterName,
            pluginName: this.state.pluginName,
        },  {
            success: function() {
                stores.ClusterStore.emitChange();
            },
        });
    },

    confirm: function() {
        // this.addCluster();
        this.hide();
        this.props.onConfirm(this.state.identity, this.state.pluginName, this.state.clusterName, this.state.clusterStatus);
        window.location.href = "https://engage1.massopencloud.org/dashboard/project/data_processing/clusters/"
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

    handlepluginNameChange: function(e) {
        this.setState({
            pluginName: e.target.value
        });
    },

    handleclusterNameChange: function(e) {
        this.setState({
            clusterName: e.target.value
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
            clusters = stores.ClusterStore.findClustersWhere({
                "created_by.username": username
            });

        if (username == null || clusters == null) {
            return <div className="loading"></div>;
        }

        if (!identities) return <div className="loading" />;

        return (
        <div role="form">
            <div className="form-group">
                <label htmlFor="project-name">
                    {"Plugin Name"}
                </label>

                <select className="form-control"    
                    value={this.state.pluginName}
                    onChange={this.handlepluginNameChange}>
                    <option>{"choose one"}</option>
                    <option>{"vanilla"}</option>
                    <option>{"spark"}</option>
                    <option>{"storm"}</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="project-description">
                    {"Cluster Name"}
                </label>
                <input type="text"
                    className="form-control"
                    placeholder="test-cluster"
                    value={this.state.clusterName}
                    onChange={this.handleclusterNameChange} />
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
                        <h1 className="t-title">Launch a Cluster</h1>
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
