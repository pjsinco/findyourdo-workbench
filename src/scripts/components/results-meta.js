'use strict';

var React = require('react');

var ResultsMeta = React.createClass({

  propTypes: {
    meta: React.PropTypes.object,
  },

  render: function() {
console.log('renderresultsmeta');
console.dir(this.props.meta);
    return (
      <div>
        {this.props.meta.city}
      </div>
    );
  }

});

module.exports = ResultsMeta;
