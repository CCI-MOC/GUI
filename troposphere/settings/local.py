# SECURITY WARNING: don't run with debug turned on in production!
import sys
globals().update(vars(sys.modules['troposphere.settings']))

DEBUG = True

if len(TEMPLATES) > 0 and 'OPTIONS' in TEMPLATES[0]:
    if 'debug' in TEMPLATES[0]['OPTIONS']:
        TEMPLATES[0]['OPTIONS']['debug'] = True

SERVER_URL="https://128.31.22.8"
BASE_URL= ""
ALLOWED_HOSTS = [SERVER_URL.replace("https://",""), "localhost"]

API_SERVER="https://128.31.22.8"

API_ROOT    = API_SERVER + "/api/v1"
API_V2_ROOT = API_SERVER + "/api/v2"

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': True,
        'BUNDLE_DIR_NAME': 'bundles/', # must end with slash
        'STATS_FILE': os.path.join(BASE_DIR, '../', 'webpack-stats.json'),
        'POLL_INTERVAL': 0.1,
        'IGNORE': ['.+\.hot-update.js', '.+\.map']
    }
}

# used to toggle between vanilla static assets & dynamic (app.js vs app-[hash].js)
DYNAMIC_ASSET_LOADING = True

SITE_TITLE= "Atmosphere"
SITE_FOOTER= "Atmosphere"

SUPPORT_EMAIL=""


MAINTENANCE_EXEMPT_USERNAMES = []



THEME_NAME="troposphere_theme"


# The location from where static files are aggregated
# ./manage.py collectstatic moves files from STATICFILES_DIRS to STATIC_ROOT
STATICFILES_DIRS = [
    ("theme", "/opt/dev/troposphere/troposphere/themes/troposphere_theme"),
]

ORG_NAME= ""





WEB_DESKTOP_INCLUDE_LINK = False

WEB_DESKTOP = {
    'signing': {
        'SECRET_KEY': '',
        'SALT': ''
    },
    'fingerprint': {
        'SECRET_KEY': '',
        'SALT': ''
    },
    'redirect': {
        'ENABLED': WEB_DESKTOP_INCLUDE_LINK,
        'PROXY_URL': '',
        'COOKIE_DOMAIN': ''
    }
}

# DATABASE
DATABASES = {
    "default": {
        'NAME': 'troposphere',
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'USER': 'atmo_app',
        'CONN_MAX_AGE': 60,
        'PASSWORD': 'atmosphere',
        'HOST': 'localhost',
        'PORT': 5432
    },
}

# Authentication
AUTHENTICATION_BACKENDS = (
    # MOCK - If enabled, Use MockLoginBackend first for single-user access.
    # Helpful for debug/development. Be sure to set Atmosphere to MockLoginBackend.
    #'iplantauth.authBackends.MockLoginBackend',
    #
    # AuthToken - Allows staff emulation via API
    # by using existing tokens as simple authentication.
    'iplantauth.authBackends.AuthTokenLoginBackend',
    #
    # ModelBackend - Allow traditional username/password. Helpful when using areas
    # of the application that do not work with SSO backends (Globus, OAuth)
    # Basically, this will come in handy if you are not using LDAP
    'django.contrib.auth.backends.ModelBackend',
    #
    # Single Sign On Backend - This backend should give you the ability to authenticate
    # and then authorize a user, (Usually, based on OAuth or some other token exchange)
    # Hello developer, you have
    # SSO Disabled but are using Mock configuration.
    # (Be sure to set Atmosphere also!)
    )
#CAS
CAS_SERVER = ""
CAS_AUTH_PREFIX = "/cas"

OAUTH_CLIENT_KEY = ""
OAUTH_CLIENT_SECRET = ""
OAUTH_CLIENT_CALLBACK = ""

# load data if available, from mocked collections rather than the api
USE_MOCK_DATA = False

# display AllocationSources rather than Allocation
USE_ALLOCATION_SOURCES = False

# atmosphere must include the metrics endpoint
SHOW_INSTANCE_METRICS = False




INSTALLED_APPS += (
    'sslserver',
)



ALWAYS_AUTH_USER = "lucas"
# Use MockLoginBackend first!
AUTHENTICATION_BACKENDS += (
    'iplantauth.authBackends.MockLoginBackend',
)

from datetime import timedelta
AUTHENTICATION = {
    #GLOBAL
    "APP_NAME": SITE_TITLE,
    "SITE_NAME": ORG_NAME,
    "TOKEN_EXPIRY_TIME": timedelta(days=1),
    "LOGOUT_REDIRECT_URL": '/logout',
    #LDAP
    "LDAP_SERVER": '',
    "LDAP_SERVER_DN": '',
    #CAS
    "CAS_SERVER": '',
    "CAS_AUTH_PREFIX": '/cas',

    #CAS+OAuth
    "OAUTH_CLIENT_KEY": '',
    "OAUTH_CLIENT_SECRET": '',
    "OAUTH_CLIENT_CALLBACK":  SERVER_URL + '/oauth2.0/callbackAuthorize',

    #GLOBUS
    "GLOBUS_OAUTH_ID": '',
    "GLOBUS_OAUTH_SECRET": '',
    "GLOBUS_OAUTH_CREDENTIALS_SCOPE": 'auth:login',
    "GLOBUS_OAUTH_ATMOSPHERE_SCOPE": '',
    "GLOBUS_TOKEN_URL": 'https://auth.globus.org/v2/oauth2/token',
    "GLOBUS_TOKENINFO_URL": 'https://auth.globus.org/v2/oauth2/token/introspect',
    "GLOBUS_AUTH_URL": 'https://auth.globus.org/v2/oauth2/authorize',
}

