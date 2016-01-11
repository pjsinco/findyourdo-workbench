'use strict';

var React = require('react');
var FindYourDoForm = require('./findyourdo-form');
var ResultsPage = require('./results-page');
var HomePage = require('./home-page');
var querystring = require('querystring');
var url = require('url');
var request = require('superagent');

var whereWeAre = window.location.pathname;

function getLocation() {
  var queryString;

  if (window.location.hash) {
    queryString = querystring.parse(window.location.hash.substr(1).replace('search?', ''))
  }

  return queryString || JSON.parse(localStorage.getItem('fydLocation'));
    
}

var App = React.createClass({

  displayName: 'App',

  getInitialState: function() {
    return {
      searchLocation: getLocation(),
      doctors: [],
      meta: {},
    };
  },

  _getDoctors: function(queryObject) {
    request
      .get('http://lookup.findyourdo.org/api/v1/physicians/search')
      .query({ page: '1' })
      .query({ per_page: '25' })
      .query({ order_by: 'distance' })
      .query({ sort: 'asc' })
      .query({ city: queryObject.city })
      .query({ state: queryObject.state })
      .query({ zip: queryObject.zip })
      .query({ lat: queryObject.lat })
      .query({ lon: queryObject.lon })
      //.query({ q: queryObject.q })
      .end(function(err, res) {
        this.setState({
          doctors: res.body.data,
          meta: res.body.meta,
        });
      }.bind(this));
  },

  /**
   * @param {object} location
   *
   */
  _handleLocationChange: function(searchLocation) {
    this.setState({
      searchLocation: searchLocation
    });
  },

  _handleHashChange: function(searchLocation) {
    this.setState({
      searchLocation: searchLocation
    });
    this._getDoctors(searchLocation);
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
    if (whereWeAre === '/find-your-do') {
      return (
        <ResultsPage 
          searchLocation={this.state.searchLocation} 
          onLocationChange={this._handleLocationChange}
          handleSubmit={this._handleSubmit}
          handleHashChange={this._handleHashChange}
          getDoctors={this._getDoctors}
          doctors={this.state.doctors}
          meta={this.state.meta}
        />
      );
    } else if (whereWeAre === '/') {
      return (
        <HomePage 
          searchLocation={this.state.searchLocation} 
          onLocationChange={this._handleLocationChange}
          handleSubmit={this._handleSubmit}
        />
      );
    } 
  }

});

module.exports = App;
