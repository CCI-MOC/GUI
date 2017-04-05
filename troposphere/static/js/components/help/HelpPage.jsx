import React from "react";
import stores from "stores";
import globals from "globals";


export default React.createClass({
    displayName: "HelpPage",

    render: function() {
        var helpLinks = stores.HelpLinkStore.getAll();
        var resourceElements;

        if (!helpLinks) {
            return <div className="loading"></div>;
        }

            var hyperlink = helpLinks.get(resource.link_key).get("href");
            return (
            <li key={resource.title}>
                <a href={hyperlink} target="_blank">
                    {resource.title}
                </a>
                <span>{" " + resource.description}</span>
            </li>
            );
        });

        return (
        <div style={{ paddingTop: "50px" }} className="container">
            <h1 className="t-display-1">Help Page</h1>
            <div>
                <h2 className="t-title">Contact</h2>
                <p>
                    {"You can contact the Massachusetts Open Cloud  support staff by clicking on the "}
                    <strong>{"Feedback & Support"}</strong>
                    {" button at the bottom of the page (to enter a help request online) or by sending an email to "}
                    <a href={`mailto:${globals.SUPPORT_EMAIL}`}>
                        {globals.SUPPORT_EMAIL}
                    </a>
                    {"."}
                </p>
            </div>
        </div>
        );
    }
});
