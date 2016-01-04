'use strict';

var React = require('react');

var LocationInput = React.createClass({

    render: function() {
        return (
            <input 
                className="form-control" 
                id="location" 
                name="location" 
                type="text" 
                placeholder="City and State or Zip" 
            />
        );
    }

});

module.exports = LocationInput;
