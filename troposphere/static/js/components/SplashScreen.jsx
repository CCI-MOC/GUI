import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";
import context from "context";
import stores from "stores";
import Router from "../Router";
import routes from "../AppRoutes";

import Raven from "raven-js";

export default React.createClass({
    displayName: "SplashScreen",

    //
    // Mounting & State
    // ----------------
    //

    getInitialState: function() {
        return {
            profile: stores.ProfileStore.get(),
            instances: stores.InstanceStore.getAll(),
            volumes: stores.VolumeStore.getAll()
        };
    },

    updateState: function() {
        var profile = stores.ProfileStore.get(),
            instances = stores.InstanceStore.getAll(),
            volumes = stores.VolumeStore.getAll(),
            isEmulatedUser;

        if (profile && instances && volumes) {

            // set user context
            context.profile = profile;
            //context.nullProject = nullProject;

            // if the emulator token exists, the user is being emulated by staff
            isEmulatedUser = !!window.emulator_token;

            if (Raven && Raven.isSetup()){
                Raven.setUserContext({
                    id: profile.get("user"),
                    name: profile.get("username"),
                    email: profile.get("email"),
                    username: profile.get("username")
                });
            }

            this.startApplication();
        }
    },

    componentDidMount: function() {
        stores.ProfileStore.addChangeListener(this.updateState);
        stores.InstanceStore.addChangeListener(this.updateState);
        stores.VolumeStore.addChangeListener(this.updateState);
    },

    componentWillUnmount: function() {
        stores.ProfileStore.removeChangeListener(this.updateState);
        stores.InstanceStore.removeChangeListener(this.updateState);
        stores.VolumeStore.removeChangeListener(this.updateState);
    },

    startApplication: function() {

        $("body").removeClass("splash-screen");

        // Start the application router
        Router.getInstance(routes).run(function(Handler, state) {
            // you might want to push the state of the router to a store for whatever reason
            // RouterActions.routeChange({routerState: state});

            // Update intercom so users get any messages sent to them
            window.Intercom("update");

            // whenever the url changes, this callback is called again
            ReactDOM.render(<Handler/>, document.getElementById("application"));
        });
    },

    render: function() {
        return null;
    }

});
