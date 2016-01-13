'use strict';

var React = require('react');
var FindYourDoForm = require('./findyourdo-form');
var ResultsMeta = require('./results-meta');
var DoctorList = require('./doctorlist');
var Filters = require('./filters');
var request = require('superagent');
var querystring = require('querystring');
var url = require('url');

var ResultsPage = React.createClass({

  getInitialState: function() {
    return {
      searchLocation: this.props.searchLocation,
      data: {},
    };
  },

  propTypes: {
    searchLocation: React.PropTypes.object,
    setLocation: React.PropTypes.func,
    handleSubmit: React.PropTypes.func,
  },

  _handleHashChange: function(searchLocation) {
console.log('handlehashchange');

    this.props.setLocation(searchLocation);

    this.setState({
      searchLocation: this.props.getLocation(),
    });

    this._getDoctors(searchLocation);
  },

  _getDoctors: function(queryObject, distance) {

    request
      //.get('http://lookup.findyourdo.org/api/v1/physicians/search')
      .get('http://lookupapi.dev/api/v1/doctors/search')
      //.query({ page: '1' })
      //.query({ per_page: '25' })
      //.query({ order_by: 'distance' })
      //.query({ sort: 'asc' })
      .query({ distance: distance })
      .query({ city: queryObject.city })
      .query({ state: queryObject.state })
      .query({ zip: queryObject.zip })
      .query({ lat: queryObject.lat })
      .query({ lon: queryObject.lon })
      //.query({ q: queryObject.q })
      .end(function(err, res) {
        this.setState({
          data: res.body,
        });
      }.bind(this));
  },

  componentDidMount: function() {

    this._getDoctors(
        querystring.parse(window.location.hash.substr(1).replace('search?', ''))
    );

    window.addEventListener('hashchange', function(evt) {

      var searchLocation = querystring.parse(
        evt.target.location.hash.substr(1).replace('search?', '')
      );

      this._handleHashChange(searchLocation);

    }.bind(this))

  },

  _handleRadiusChange: function() {

  },

  componentWillMount: function() {
    
  },

  componentWillUnmount: function() {
    window.removeListener('hashchange');
  },

  render: function() {
    var results;

    if (Object.keys(this.state.data).length > 0) {
      results = (
        <div>
          <ResultsMeta meta={this.state.data.meta} />
          <DoctorList doctors={this.state.data.data} />
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-6">
          <FindYourDoForm
            searchLocation={this.state.searchLocation}
            onLocationChange={this.props.setLocation}
            handleSubmit={this.props.handleSubmit}
          />
          {results}
        </div>
        <div className="col-md-6">
          <Filters data={this.state.data} 
            handleRadiusChange={this._handleRadiusChange}
            getDoctors={this._getDoctors}
            searchLocation={this.state.searchLocation}
          />
        </div>
      </div>
    );
  }

});

module.exports = ResultsPage;
