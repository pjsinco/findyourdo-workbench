'use strict';

var React = require('react');
var FindYourDoForm = require('./findyourdo-form');
var ResultsMeta = require('./results-meta');
var request = require('superagent');
var querystring = require('querystring');
var url = require('url');

var ResultsPage = React.createClass({

  propTypes: {
    searchLocation: React.PropTypes.object,
    onLocationChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
  },

  componentDidMount: function() {

    this.props.getDoctors(
        querystring.parse(window.location.hash.substr(1).replace('search?', ''))
    );

    window.addEventListener('hashchange', function(evt) {

      var searchLocation = querystring.parse(
        evt.target.location.hash.substr(1).replace('search?', '')
      );

      this.props.handleHashChange(searchLocation);

    }.bind(this))

  },

  render: function() {
    return (
      <div>
        <FindYourDoForm
          searchLocation={this.props.searchLocation}
          onLocationChange={this.props.onLocationChange}
          handleSubmit={this.props.handleSubmit}
        />
        <ResultsMeta
          meta={this.props.meta}
        />
      </div>
    );
  }

});

module.exports = ResultsPage;
