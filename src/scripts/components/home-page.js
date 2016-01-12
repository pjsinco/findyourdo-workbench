'use strict';

var React = require('react');
var FindYourDoForm = require('./findyourdo-form');

var HomePage = React.createClass({

  displayName: 'HomePage',

  render: function() {
    return (
      <div className="col-md-6">
        <FindYourDoForm
          searchLocation={this.props.searchLocation}
          onLocationChange={this.props.setLocation}
          handleSubmit={this.props.handleSubmit}
        />
      </div>
    );
  }

});

module.exports = HomePage;
