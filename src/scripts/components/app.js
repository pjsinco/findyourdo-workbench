'use strict';

var React = require('react');
var FindYourDoForm = require('./findyourdo-form');
var ResultsPage = require('./results-page');
var HomePage = require('./home-page');

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
        />
      );
    } else if (whereWeAre === '/') {
      return (
        <HomePage 
          searchLocation={this.state.searchLocation} 
          onLocationChange={this._handleLocationChange}
        />
      );
    } 

  }

});

module.exports = App;
