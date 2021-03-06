'use strict';

var React = require('react');
var TypeaheadInput = require('./typeahead-input');
var LocationForm = React.createClass({

    render: function() {
        return (
            <form action="">
                <div className="hero--form--inner">
                    <div className="row">
                        <div className="col-sm-12 location form-group">
                            <TypeaheadInput 
                                onChange={this.props.onChange}
                                bloodhound={this.props.bloodhound}
                                data={this.props.data}
                            />
                            <i className="searchclear">&times;</i>
                        </div>
                    </div>
                </div> 
                <span className="hero--form--button btn btn-default">
                    <button>GO <i className="fa fa-angle-double-right"></i></button>
                </span>
            </form>
            
        );
    }

});

module.exports = LocationForm;
