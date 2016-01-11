'use strict';

var React = require('react');
var LocationInput = require('./location-input');

var FindYourDoForm = React.createClass({

  displayName: 'FindYourDoForm',

  /**
   * @param {string} value
   */
  _parseLocation: function(value) {
    if (value.indexOf(', ') === -1) {
      return null;
    }

    var location = value.split(', ');

    return {
      city: location[0],
      state: location[1],
    };
  },

  _handleSubmit: function(evt) {
    evt.preventDefault();
    var location = this._parseLocation(this.refs.location.state.value);
    this.props.handleSubmit(location);
  },

  _handleLocationSelected: function(location) {
    this.props.onLocationChange(location);
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-9 hero--form">
          <form className="form-inline" 
            id="findYourDo" 
            action="" 
            onSubmit={this._handleSubmit}
          >
            <div className="hero--form--inner">
              <div className="row">
                <div className="col-sm-12 location">
                  <div className="form-group">
                    <LocationInput 
                      ref="location"
                      handleLocationSelected={this._handleLocationSelected}
                      searchLocation={this.props.searchLocation}
                    />
                    { /*<i className="searchclear">&times;</i> */ }
                  </div>
                  {' '}
                  <span className="hero--form--button">
                    <button className="btn btn-default">GO <i className="fa fa-angle-double-right"></i></button>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div> 
      </div> 
    );
  }

});

module.exports = FindYourDoForm;
