'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var querystring = require('querystring');
var url = require('url');

var Filters = React.createClass({

  _getMin: function() {
    
  },

  _getMax: function() {
    
  },

  _onMouseUp: function(evt) {
    var radius = evt.target.value;
console.log(radius);

    var newUrl = {
      protocol: window.location.protocol,
      host: window.location.host,
      pathname: '/find-your-do',
      hash: 'search'
    };

    this.props.getDoctors(this.props.searchLocation, radius);


//    if (searchLocation) {
//      window.location = url.format(newUrl) + '?' + 
//        querystring.stringify(searchLocation);
//    }
//    this.props.getDoctors(
//
//    );
    
  },

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
        <label htmlFor="radius">Distance</label>
        <input onChange={this._onChange} 
          onInput={this._onInput}
          onMouseUp={this._onMouseUp}
          type="range" 
          name="radius" 
          min={1} 
          max={250} 
          step={1} 
          ref="radius"
        />
        <p>
        </p>
      </div>
    );
  }

});

module.exports = Filters;
