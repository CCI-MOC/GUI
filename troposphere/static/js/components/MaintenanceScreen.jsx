import React from "react";
import globals from "globals";

let login = globals.THEME_URL + "/images/login_mainimage.png";

export default React.createClass({
    displayName: "MaintenanceScreen",

    render: function() {
            imageParentStyle = {
                "display": "block",
                "margin": "auto",
                "padding-top": "50px"
            };

        return (
        <div>
            <div style={imageParentStyle}>
                <div id="imgcontainer" className="center">
                    <img src={login} />
                </div>
            </div>
            <h4 className="t-title">
                Atmosphere is currently under maintenance.
            </h4>
        </div>
        );
    }

});
