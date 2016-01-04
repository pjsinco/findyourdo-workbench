'use strict';

var React = require('react');
var ExampleStore = require('../stores/example-store');
var LocationForm = require('./location-form');

var App = React.createClass({

    getInitialState: function() {
        return {
            // TODO probably using a getter on a store
        };
    },

    componentDidMount: function() {
        // TODO probably as
        // ExampleStore.addChangeListener(this._onChange);
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

    render: function() {

        return (
            <LocationForm />
        );
    }

});

module.exports = App;
