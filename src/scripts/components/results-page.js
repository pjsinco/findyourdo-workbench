'use strict';

var React = require('react');


var ResultsPage = React.createClass({

  /**
   * https://css-tricks.com/snippets/jquery/get-query-params-object/
   * 
   */
  _getQueryParameters: function() {
      var paramString = '?' + window.location.href.split('?')[1];
  
      return (paramString)
          .replace(/(^\?)/,'')
          .split("&")
          .map(function(n) {
              return n = n.split("="),this[n[0]] = decodeURIComponent(n[1]), this;
          }.bind({}))[0];
  },

  propTypes: {
    searchLocation: React.PropTypes.object,
    onLocationChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
  },

  componentDidMount: function() {
    var searchObject = this._getQueryParameters();

    // TODO temp
    console.dir(searchObject);
    
  },

  render: function() {

    return (
      <div />
    );
  }

});

module.exports = ResultsPage;
