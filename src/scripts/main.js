//var React = require('react');
//var ReactDOM = require('react-dom');
//var App = require('./components/app');
//var AppAutoSuggest = require('./components/app-autosuggest');

import React from 'react';
import ReactDOM from 'react-dom';
import AppAutosuggest from './components/app-autosuggest';
import AppAutosuggestAsync from './components/app-autosuggest-async';
import Example from './components/example';

(function() {

    console.log('hiya');

    ReactDOM.render(
        <Example />,
        document.getElementById('findYourDoApp')
    );

})();


