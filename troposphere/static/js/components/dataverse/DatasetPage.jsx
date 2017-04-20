import React from "react";
import stores from "stores";
import globals from "globals";


export default React.createClass({
    displayName: "HelpPage",

    render: function() {
        var helpLinks = stores.HelpLinkStore.getAll();

        if (!helpLinks) {
            return <div className="loading"></div>;
        }

        return (
        <div style={{ paddingTop: "50px" }} className="container">
            <h1 className="t-display-1">Datasets</h1>
            <div>
                <h2 className="t-title">Cloud Dataverse</h2>
                <p>
                    {"Please go to"}<a href={"http://dataverse.org"}> {"cloud dataverse "}</a>{"website to pick up the datasets that you would like to use"}
                </p>
            </div>
        </div>
        );
    }
});
