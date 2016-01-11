'use strict';

var React = require('react');
var FindYourDoForm = require('./findyourdo-form');
var ResultsPage = require('./results-page');
var HomePage = require('./home-page');
var querystring = require('querystring');
var url = require('url');

var whereWeAre = window.location.pathname;


var App = React.createClass({

  displayName: 'App',

  getInitialState: function() {
    return {
      searchLocation: JSON.parse(localStorage.getItem('fydLocation'))
    };
  },

  /**
   * @param {object} location
   *
   */
  _handleLocationChange: function(location) {
    this.setState({
      searchLocation: location
    });
  },

  /**
   * @param {object} location 
   *
   */
  _handleSubmit: function(location) {
    var newUrl = {
      protocol: window.location.protocol,
      host: window.location.host,
      pathname: '/find-your-do',
      hash: 'search'
    };

    window.location = url.format(newUrl) + '?' + 
      querystring.stringify(this.state.searchLocation);
  },

  componentWillUpdate: function(nextProps, nextState) {
    localStorage.setItem('fydLocation', JSON.stringify({
      city:  nextState.searchLocation.city,
      state: nextState.searchLocation.state,
      zip:   nextState.searchLocation.zip,
      lat:   nextState.searchLocation.lat,
      lon:   nextState.searchLocation.lon,
    }));
  },

  render: function() {
    var component;

    if (whereWeAre === '/find-your-do') {
      return (
        <ResultsPage 
          searchLocation={this.state.searchLocation} 
          onLocationChange={this._handleLocationChange}
          onSubmit={this._handleSubmit}
        />
      );
    } else if (whereWeAre === '/') {
      return (
        <HomePage 
          searchLocation={this.state.searchLocation} 
          onLocationChange={this._handleLocationChange}
          onSubmit={this._handleSubmit}
        />
      );
    } 

  }

});

module.exports = App;
