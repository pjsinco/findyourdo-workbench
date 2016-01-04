'use strict';

var React = require('react');
var typeahead = require('./../../../node_modules/typeahead.js/dist/typeahead.jquery.min.js');
var Bloodhound = require('./../../../node_modules/typeahead.js/dist/bloodhound.min.js');
var $ = require('jquery');

var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];


var LocationInput = React.createClass({

    componentDidMount: function() {
        var locationEngine = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: states,
        });
        
        $('#location').typeahead({
            hint: true,
            highlight: true,
            minLength: 2,
        }, {
            name: 'states',
            source: locationEngine,
        });
            
        
    },

    
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
