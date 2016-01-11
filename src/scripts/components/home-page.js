'use strict';

var React = require('react');
var FindYourDoForm = require('./findyourdo-form');

var HomePage = React.createClass({

  displayName: 'HomePage',

  _handleSubmit: function() {
    this.props.handleSubmit(); 
  },

  render: function() {
    return (
      <FindYourDoForm
        searchLocation={this.props.searchLocation}
        onLocationChange={this.props.onLocationChange}
        handleSubmit={this.props.handleSubmit}
      />
    );
  }

});

module.exports = HomePage;
