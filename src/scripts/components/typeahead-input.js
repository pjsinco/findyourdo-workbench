'use strict';

var React = require('react');
//var typeahead = require('./../../../node_modules/typeahead.js/dist/typeahead.jquery.min.js');
//require('./../../../node_modules/typeahead.js/dist/typeahead.jquery.min.js');
//var Bloodhound = require('./../../../node_modules/typeahead.js/dist/bloodhound.min.js').Bloodhound;
//var Bloodhound = require('./../../../node_modules/typeahead.js/dist/bloodhound.min.js').Bloodhound;
//var Bloodhound = require('./../../../node_modules/typeahead.js/dist/bloodhound.min.js');
//var $ = require('jquery');
var Typeahead = require('react-typeahead').Typeahead;


var LocationInput = React.createClass({

    componentWillMount: function() {
        
    },

    componentDidMount: function() {
//        var specialties = new Bloodhound({
//            datumTokenizer: Bloodhound.tokenizers.obj.nonword('name'),
//            queryTokenizer: Bloodhound.tokenizers.whitespace,
//            prefetch: {
//                url: 'http://lookup.findyourdo.org/api/v1/specialties',
//                filter: function(obj) {
//                    return $.map(obj['data'], function(specialty) {
//                        return specialty;
//                    });
//                }
//            },
//            //local: states,
//        });
//        this.refs.location.focus(); // TODO not working
//        //this.props.bloodhound.initialize();
//        specialties.initialize();
//        
//        $(this.refs.location).typeahead({
//            hint: true,
//            highlight: true,
//            minLength: 2,
//        }, {
//            source: specialties.ttAdapter(),
//        });
            
        
    },

    
    render: function() {
        return (
            <Typeahead
                options={['Rod', 'Nolan', 'George', 'Bucky']}
                maxVisible={2}
            />
//            <input 
//                className="form-control" 
//                id="location" 
//                name="location" 
//                ref="location"
//                type="text" 
//                placeholder="Specialty ..." 
//            />
        );
    }

});

module.exports = LocationInput;
