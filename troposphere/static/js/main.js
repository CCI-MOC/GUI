import "babel-polyfill";
import bootstrapper from "bootstrapper";
import "css/app/app.scss";

<<<<<<< HEAD
=======

if(!window.SENTRY_ENABLED) {
    let sentryDSN = window.SENTRY_DSN;
    Raven.config(sentryDSN, {
        release: window.SENTRY_RELEASE
    }).install();
}


>>>>>>> a856735a7697a36e433d85ee5294bc58ce0f0d94
bootstrapper.run();
