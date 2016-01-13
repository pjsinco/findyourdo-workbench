'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var RadiusFilter = require('./filters/radius');
var querystring = require('querystring');
var url = require('url');

var Filters = React.createClass({


  _onChange: function(evt) {
//console.log('slideronchange');    
//console.log(evt.target.value);
  },

  _onInput: function(evt) {
//console.log('slideroninput');    
//console.log(evt.target.value);
  },

  render: function() {
    return (
      <div className="filters">
        <RadiusFilter 
          searchLocation={this.props.searchLocation} 
          getDoctors={this.props.getDoctors}
        />
      </div>
    );
  }

});

module.exports = Filters;
