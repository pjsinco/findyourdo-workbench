'use strict';

var React = require('react');
var ExampleStore = require('../stores/example-store');
var $ = require('jquery');
var LocationForm = require('./location-form');
var Bloodhound = require('./../../../node_modules/typeahead.js/dist/bloodhound.min.js');

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

var App = React.createClass({

    getInitialState: function() {
        return {
            // TODO probably using a getter on a store
        };
    },

    componentWillMount: function() {
        

        // TODO probably as
        // ExampleStore.addChangeListener(this._onChange);
//        this.engine = new Bloodhound({
//            datumTokenizer: Bloodhound.tokenizers.obj.nonword('name'),
//            queryTokenizer: Bloodhound.tokenizers.whitespace,
//            prefetch: {
//                url: 'http://lookup.findyourdo.org/api/v1/specialties',
//                filter: function(obj) {
//                    return _.map(obj['data'], function(specialty) {
//                        return specialty;
//                    });
//                }
//            },
//            //local: states,
//        });

    },

    componentWillUnmount: function() {
        // TODO probably as
        // ExampleStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({
            // TODO
        });        
    },

    _handleLocationChange: function() {

console.log('handlelocationchange');      

    },

    render: function() {
        return (
            <LocationForm 
                onChange={this._handleLocationChange}
                data={states}
                bloodhound={this.engine}
            />
        );
    }

});

module.exports = App;
