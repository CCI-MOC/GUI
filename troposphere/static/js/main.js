import "babel-polyfill";
import bootstrapper from "bootstrapper";
import "css/app/app.scss";
<<<<<<< HEAD
=======

>>>>>>> 8aff9c37510fbcabd69b8de51ea82e06edc5e887


if(!window.SENTRY_ENABLED) {
    let sentryDSN = window.SENTRY_DSN;
    Raven.config(sentryDSN, {
        release: window.SENTRY_RELEASE
    }).install();
}


bootstrapper.run();
