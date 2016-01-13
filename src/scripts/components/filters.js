'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Filters = React.createClass({

  _getMin: function() {
    
  },

  _getMax: function() {
    
  },

  _onMouseUp: function(evt) {
console.log('onmouseup');
console.log(evt.target.value);
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
          min={0} 
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
