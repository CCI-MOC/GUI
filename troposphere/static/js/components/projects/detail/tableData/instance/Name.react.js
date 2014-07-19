/** @jsx React.DOM */

define(
  [
    'react',
    'backbone',
    'url'
  ],
  function (React, Backbone, URL) {

    return React.createClass({

      propTypes: {
        project: React.PropTypes.instanceOf(Backbone.Model).isRequired,
        instance: React.PropTypes.instanceOf(Backbone.Model).isRequired
      },

      render: function () {
        var project = this.props.project,
            instance = this.props.instance;

        var instanceUrl = URL.projectInstance({
          project: project,
          instance: instance
        }, {absolute: true});

        return (
          <a href={instanceUrl}>{instance.get('name')}</a>
        );
      }

    });

  });
