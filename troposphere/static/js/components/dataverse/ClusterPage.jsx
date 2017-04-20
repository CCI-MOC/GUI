import React from "react";
import stores from "stores";
import globals from "globals";
import ClusterLaunchButton from "./ClusterLaunchButton";

export default React.createClass({
    displayName: "ClusterPage",

    getInitialState: function() {
        return {
            clusters: stores.ClusterStore.getAll(),
        };
    },

    updateState: function() {
        this.setState(this.getInitialState());
    },

    componentDidMount: function() {
        stores.ClusterStore.addChangeListener(this.updateState);
    },

    componentWillUnmount: function() {
        stores.ClusterStore.removeChangeListener(this.updateState);
    },

    style() {
        return {
            td: {
                wordWrap: "break-word",
                whiteSpace: "normal"
            }
        }
    },

    renderClusterRow: function(cluster) {
        let { td } = this.style();
        return (
        <tr key={cluster.get("id")}>
            <td style={td}>
                {cluster.get("clusterName")}
            </td>
            <td style={td}>
                {cluster.get("pluginName")}
            </td>
            <td style={td}>
                {cluster.get("clusterStatus")}
            </td>
        </tr>
        );
    },

    render: function() {
        var clusters = this.state.clusters;
        
        return (
        <div style={{ paddingTop: "50px" }} className="container">
            <h1 className="t-display-1">Clusters</h1>
            <div>
                <h2 className="t-title">Launch a cluster</h2>
                <ClusterLaunchButton />
            </div>
            <div>
                <table className="clearfix table" style={{ tableLayout: "fixed" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "30px"}}>Cluster Name</th>
                            <th style={{ width: "30px"}}>Plugin Name</th>
                            <th style={{ width: "30px"}}>Status</th>
                            <th style={{ width: "30px"}}></th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        { clusters ? clusters.map(this.renderClusterRow) : [] }
                    </tbody>
                    </table>
            </div>
        </div>
        );
    }
});
