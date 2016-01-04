'use strict';

var React = require('react');
var typeahead = require('./../../../node_modules/typeahead.js/dist/typeahead.jquery.min.js');
var Bloodhound = require('./../../../node_modules/typeahead.js/dist/bloodhound.min.js');
var $ = require('jquery');

var LocationInput = React.createClass({

    componentWillMount: function() {
        
    },

    componentDidMount: function() {
        this.refs.location.focus(); // TODO not working
        
        $(this.refs.location).typeahead({
            hint: true,
            highlight: true,
            minLength: 2,
        }, {
            source: this.props.bloodhound,
        });
            
        
    },

    
    render: function() {
        return (
            <input 
                className="form-control" 
                id="location" 
                name="location" 
                ref="location"
                type="text" 
                placeholder="City and State or Zip" 
            />
        );
    }

});

module.exports = LocationInput;
