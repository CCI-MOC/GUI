import "babel-polyfill";
import bootstrapper from "public_site/bootstrapper";


if(!window.SENTRY_ENABLED) {
    let sentryDSN = window.SENTRY_DSN;
    Raven.config(sentryDSN, {
        release: window.SENTRY_RELEASE
    }).install();
}

bootstrapper.run();
