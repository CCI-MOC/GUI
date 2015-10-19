define(function (require) {
  "use strict";

  var React = require('react'),
      Router = require('react-router'),
      Badge = require('./Badge.react'),
      actions = require('actions'),
      EarnedBadge = require('./EarnedBadge.react'),
      stores = require('stores'),
      RouteHandler = Router.RouteHandler;

  return React.createClass({

    mixins: [Router.State],

    render: function(){
      return(
        <div className="container badges">
          <span className="buttons">
            <Router.Link to="my-badges">
              <div className="btn">My Badges</div>
            </Router.Link>
            <Router.Link to="unearned-badges">
              <div className="btn">Unearned Badges</div>
            </Router.Link>
            <Router.Link to="all-badges">
              <div className="btn">All Badges</div>
            </Router.Link> 
          </span>
          <RouteHandler />
        </div>
      )
    }

  });

});
