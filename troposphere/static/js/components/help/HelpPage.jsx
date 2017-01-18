import React from "react";
import stores from "stores";
import globals from "globals";

export default React.createClass({
    displayName: "MarketplaceCorePage",
    
    render: function() {
    
    let imgs = ["https://info.massopencloud.org/wp-content/uploads/2016/03/bu-e1460748238801.jpg", "https://info.massopencloud.org/wp-content/uploads/2016/03/harvard.jpg", "https://info.massopencloud.org/wp-content/uploads/2016/03/mit.jpg", "https://info.massopencloud.org/wp-content/uploads/2016/03/northeastern.jpg"];

    return (
        <div style={{ paddingTop: "50px" }} className="container">
            <h1 className="t-display-1">Marketplace</h1>
            <h2 className="t-title">Services</h2>
            <table style={{width: 752}}>
	    <tbody>
                <tr>
		<td style={{width: 163.875}}><img src="https://info.massopencloud.org/wp-content/uploads/2016/01/imgres.png" style = {{float: "left", width: 150, height: 100}} /></td>
		<td style={{width: 573.125}}>Platform as a Service Platform as a Service Platform as a Service Platform as a Service Platform as a Service Platform as a Service Platform as a Service Platform as a Service</td>
	        </tr>
                <div></div>
		<tr>
		<td style={{width: 163.875}}><img src="https://info.massopencloud.org/wp-content/uploads/2016/01/sahara-logo-1.png" style = {{float: "left", width: 150, height: 100}} /></td>
		<td style={{width: 573.125}}>Big Data as a Service Big Data as a Service Big Data as a Service Big Data as a Service Big Data as a Service Big Data as a Service Big Data as a Service Big Data as a Service</td>
		</tr>
		<tr>
		<td style={{width: 163.875}}><img src="https://info.massopencloud.org/wp-content/uploads/2016/01/Big-Data-Analytics-Word-Cloud-660x384.jpg" style = {{float: "left", width: 150, height: 100}} /></td>
		<td style={{width: 573.125}}>Cloud Data Analytics Cloud Data Analytics Cloud Data Analytics Cloud Data Analytics Cloud Data Analytics Cloud Data Analytics Cloud Data Analytics Cloud Data Analytics Cloud Data Analytics</td>
		</tr>
                <tr>
                <td style={{width: 163.875}}><img src="https://info.massopencloud.org/wp-content/uploads/2016/09/large-logo-moc.jpg" style = {{float: "left", width: 150, height:100}} /></td>
                <td style={{width: 573.125}}>Hardware Isolated Layer Hardware Isolated Layer Hardware Isolated Layer Hardware Isolated Layer Hardware Isolated Layer Hardware Isolated Layer Hardware Isolated Layer Hardware Isolated Layer</td>
                </tr>
                <tr>
                <td style={{width: 163.875}}><img src="https://info.massopencloud.org/wp-content/uploads/2016/09/large-logo-moc.jpg" style = {{float: "left", width: 150, height:100}} /></td>
                <td style={{width: 573.125}}>Cloud Resource Federation (K2K) Cloud Resource Federation (K2K) Cloud Resource Federation (K2K) Cloud Resource Federation (K2K) Cloud Resource Federation (K2K) Cloud Resource Federation (K2K) Cloud Resource Federation (K2K)</td>
                </tr>
             </tbody>
             </table>
        </div>
        )
    }
});
/*    
    return (
        <ul>
            {imgs.map(function(img){
                return <span>
                       <li><p><img src={img} style={{float: "left", width: 100, height: 50}} />Description goes here about these 5 services we have</p></li>
                       <br />
                       </span>;
            })}
        </ul>
        );
    }
});
*/

/*
let resources = [{
    title: "User Manual",
    link_key: "default",
    description: "Complete documentation for using Atmosphere"
},
    {
        title: "User Forums",
        link_key: "forums",
        description: "Get answers from Atmosphere users and staff"
    },
    {
        title: "FAQs",
        link_key: "faq",
        description: "Atmosphere's most frequently asked questions"
    },
    {
        title: "VNC Viewer Tutorial",
        link_key: "vnc-viewer",
        description: "Instructions for downloading and using VNC Viewer"
    }
];

export default React.createClass({
    displayName: "HelpPage",

    render: function() {
        var helpLinks = stores.HelpLinkStore.getAll();
        var resourceElements;

        if (!helpLinks) {
            return <div className="loading"></div>;
        }

        var resourceElements = resources.map(function(resource) {
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
            <h2 className="t-title">External resources</h2>
            <ul>
                {resourceElements}
            </ul>
            <div>
                <h2 className="t-title">Contact</h2>
                <p>
                    {"You can contact the Atmosphere support staff by clicking on the "}
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
*/

