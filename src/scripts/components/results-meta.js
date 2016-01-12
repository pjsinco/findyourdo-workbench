'use strict';

var React = require('react');

var ResultsMeta = React.createClass({

  propTypes: {
    meta: React.PropTypes.object,
  },

  render: function() {
    var meta = this.props.meta;

    return (
      <div>
        {meta.pagination.total} {meta.city}, {meta.state}
      </div>
    );
  }

});

module.exports = ResultsMeta;
