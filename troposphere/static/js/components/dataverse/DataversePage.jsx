import React from "react";
import Router from "react-router";
import SecondaryHelpNavigation from "components/dataverse/common/SecondaryDataverseNavigation";

let RouteHandler = Router.RouteHandler;

export default React.createClass({
   displayName: "DataverMaster",

    render: function() {
        return (
        <div>
            <SecondaryHelpNavigation currentRoute="todo-remove-this" />
            <RouteHandler/>
        </div>
        );
    }
})
