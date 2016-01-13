'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var RadiusFilter = require('./filters/radius');
var SpecialtyFilter = require('./filters/specialty');
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
        <div className="row">
          <div className="col-md-12">
            <RadiusFilter 
              searchLocation={this.props.searchLocation} 
              getDoctors={this.props.getDoctors}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <SpecialtyFilter 
              searchLocation={this.props.searchLocation} 
              getDoctors={this.props.getDoctors}
              doctors={this.props.data.data}
            />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Filters;
