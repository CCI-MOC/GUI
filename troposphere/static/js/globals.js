import jstz from "jstz";


let timezone = jstz.determine();
let tz_region = timezone ? timezone.name() : "America/Phoenix";
let shell_proxy = "https://giji.massopencloud.org";
let default_footer_link = "https://giji.massopencloud.org";

let USER_PORTAL = {
    link() {
        return window.user_portal && window.user_portal.link || "";
    },
    text() {
        return window.user_portal && window.user_portal.text || "";
    }
};


export default {
    API_ROOT: window.API_ROOT || "/api/v1",
    API_V2_ROOT: window.API_V2_ROOT || "/api/v2",
    API_V2_MOCK_ROOT: window.API_V2_MOCK_ROOT,
    TROPO_API_ROOT: window.TROPO_API_ROOT || "/tropo-api",
    WEB_SH_URL: window.WEB_SH_URL || shell_proxy,
    THEME_URL: window.THEME_URL || "",
    SITE_TITLE: window.SITE_TITLE || "MOC-GIJI",
    SITE_FOOTER: window.SITE_FOOTER || "MOC",
    SITE_FOOTER_LINK: window.SITE_FOOTER_LINK || default_footer_link,
    UI_VERSION: window.UI_VERSION || "Unknown Unicolored-Jay",
    SUPPORT_EMAIL: window.SUPPORT_EMAIL || "moc-kaizen-l@bu.edu",
    TZ_REGION: tz_region,
    BADGE_HOST: window.BADGE_HOST,
    BADGES_ENABLED: window.BADGES_ENABLED || false,
    USE_MOCK_DATA: window.USE_MOCK_DATA || false,
    USE_ALLOCATION_SOURCES: window.USE_ALLOCATION_SOURCES,
    SHOW_INSTANCE_METRICS: window.SHOW_INSTANCE_METRICS,
    USER_PORTAL
}
