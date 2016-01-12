'use strict';

var React = require('react');
var FindYourDoForm = require('./findyourdo-form');

var HomePage = React.createClass({

  displayName: 'HomePage',

  render: function() {
    return (
      <FindYourDoForm
        searchLocation={this.props.searchLocation}
        onLocationChange={this.props.setLocation}
        handleSubmit={this.props.handleSubmit}
      />
    );
  }

});

module.exports = HomePage;
