/** @jsx React.DOM */

define(
  [
    'react',
    'backbone',
    'components/common/PageHeader.react',
    'components/common/SecondaryNavigation.react',
    'collections/ApplicationCollection',
    './ApplicationCardList.react',
    './ApplicationCardGrid.react',
    './SearchContainer.react'
  ],
  function (React, Backbone, PageHeader, SecondaryNavigation, ApplicationCollection, ApplicationCardList, ApplicationCardGrid, ApplicationSearch) {

    return React.createClass({

      propTypes: {
        applications: React.PropTypes.instanceOf(Backbone.Collection).isRequired,
        tags: React.PropTypes.instanceOf(Backbone.Collection).isRequired
      },

      getInitialState: function(){
        return {
         viewType: 'list'
        }
      },

      onChangeViewType: function(){
        if(this.state.viewType === "list"){
          this.setState({viewType: 'grid'});
        }else{
          this.setState({viewType: 'list'});
        }
      },

      getRoutes: function(){
        return [
          {
            name: "Search",
            href: "/application/images"
          },
          {
            name: "Favorites",
            href: "/application/images/favorites"
          },
          {
            name: "My Images",
            href: "/application/images/authored"
          }
        ];
      },

      renderFeaturedImages: function(){
        var applications = this.props.applications;
        var tags = this.props.tags;

        if (applications && tags) {
          var featuredApplicationArray = applications.filter(function (app) {
            return app.get('featured');
          });
          var featuredApplications = new ApplicationCollection(featuredApplicationArray);

          if(this.state.viewType === "list") {
            return (
              <ApplicationCardList key="featured"
                                   title="Featured Images"
                                   applications={featuredApplications}
                                   tags={tags}
              />
            );
          }else{
            return (
              <ApplicationCardGrid key="featured"
                                   title="Featured Images"
                                   applications={featuredApplications}
                                   tags={tags}
              />
            );
          }
        }
      },

      renderImages: function(){
        var applications = this.props.applications;
        var tags = this.props.tags;

        if (applications && tags) {
          if(this.state.viewType === "list") {
            return (
              <ApplicationCardList key="all"
                                   title="All Images"
                                   applications={applications}
                                   tags={tags}
              />
            );
          }else{
            return (
              <ApplicationCardGrid key="all"
                                   title="All Images"
                                   applications={applications}
                                   tags={tags}
              />
            );
          }
        } else {
          return (
            <div className="loading"></div>
          );
        }
      },

      renderListButton: function(){
        var classValues = "btn btn-default";
        if(this.state.viewType === "list") classValues += " active";

        return (
          <button type="button" className={classValues} onClick={this.onChangeViewType}>
            <span className="glyphicon glyphicon-align-justify"></span> List
          </button>
        );
      },

      renderGridButton: function(){
        var classValues = "btn btn-default";
        if(this.state.viewType === "grid") classValues += " active";

        return (
          <button type="button" className={classValues} onClick={this.onChangeViewType}>
            <span className="glyphicon glyphicon-th"></span> Grid
          </button>
        );
      },

      render: function () {
        var routes = this.getRoutes();

        return (
          <div>
            <div className="clearfix">
              <div className="btn-group pull-right">
                {this.renderListButton()}
                {this.renderGridButton()}
              </div>
            </div>
            {this.renderFeaturedImages()}
            {this.renderImages()}
          </div>
        );

      }

    });

  });
