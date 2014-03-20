import logging
from datetime import datetime

from flask import Flask
from flask import (render_template, redirect, url_for, request, abort, g,
    flash, get_flashed_messages)
import requests

from troposphere.cas import CASClient, InvalidTicket
from troposphere.oauth import OAuthClient, Unauthorized

logger = logging.getLogger(__name__)
app = Flask(__name__)

def get_oauth_client():
    if not hasattr(g, 'oauth_client'):
        key = open(app.config['OAUTH_PRIVATE_KEY'], 'r').read()
        g.oauth_client = OAuthClient(app.config['OAUTH_SERVER'],
                                     key,
                                     app.config['OAUTH_ISS'],
                                     app.config['OAUTH_SCOPE'])
    return g.oauth_client

def get_cas_client():
    if not hasattr(g, 'cas_client'):
        validator_url = url_for('cas_service_validator',
                                sendback=url_for('application'),
                                _external=True,
                                _scheme='https')
        g.cas_client = CASClient(app.config['CAS_SERVER'],
                                 validator_url)
    return g.cas_client

def get_maintenance():
    """
    Returns a list of maintenance records along with a boolean to indicate
    whether or not login should be disabled
    """
    return ([], False)

@app.errorhandler(503)
def handle_maintenance():
    return "We're undergoing maintenance"

@app.route('/login', methods=['GET', 'POST'])
def login():
    """
    CAS Login : Phase 1/3 Call CAS Login
    """
    records, disabled_login = get_maintenance()
    if disabled_login:
        abort(503)

    return redirect(get_cas_client().get_login_endpoint())

@app.route('/logout')
def logout():
    """
    TODO: Destroy OAuth session
    """
    if request.args.get('cas', False):
        root_url = url_for('application', _external=True, _scheme='https')
        return redirect(get_cas_client().get_logout_endpoint(root_url))
    return redirect(url_for('application'))

@app.route('/CAS_serviceValidater')
def cas_service_validator():
    """
    Method expects 2 GET parameters: 'ticket' & 'sendback'
    After a CAS Login:
    Redirects the request based on the GET param 'ticket'
    Unauthorized Users are returned a 401
    Authorized Users are redirected to the GET param 'sendback'
    """
    logger.debug('GET Variables:%s' % request.args)
    sendback = request.args.get('sendback', '')
    ticket = request.args.get('ticket', None)
    if not ticket:
        logger.info("No Ticket received in GET string")
        abort(400)

    try:
        user = get_cas_client().validate_ticket(ticket)
    except InvalidTicket:
        return redirect(url_for('application'))

    logger.debug(user + " successfully authenticated against CAS")

    # Now check Groupy
    try:
        token, expires = get_oauth_client().generate_access_token(user)
        logger.debug("TOKEN: " + token)
        expires = int((expires - datetime.utcfromtimestamp(0)).total_seconds())
        flash({'access_token': token, 'expires': expires})
        return redirect(url_for('application'))
    except Unauthorized:
        abort(403)

@app.errorhandler(403)
def no_user(e):
    logger.debug(e)
    return "You're not an Atmopshere user"

@app.route('/')
def redirect_to_application():
    return redirect(url_for('application'))

@app.route('/application', defaults={'path': ''})
@app.route('/application/<path:path>')
def application(path):
    messages = get_flashed_messages()
    if len(messages) > 0:
        return render_template('application.html',
                               access_token=messages[0]['access_token'],
                               expires=messages[0]['expires'])
    return render_template('application.html')

if __name__ == '__main__':
    app.config.from_pyfile('troposphere.cfg')
    app.run(host='0.0.0.0', debug=True)
