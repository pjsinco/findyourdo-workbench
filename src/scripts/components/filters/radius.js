'use strict';

var React = require('react');

var RadiusFilter = React.createClass({

  propTypes: {
    searchLocation: React.PropTypes.object,
    getDoctors: React.PropTypes.func,
  },

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

  },

  render: function() {
    return (
      <div className="form-group">
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

module.exports = RadiusFilter;
