//var React = require('react');
//var ReactDOM = require('react-dom');
//var App = require('./components/app');
//var AppAutoSuggest = require('./components/app-autosuggest');

import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/home-page';
import ResultsPage from './components/results-page';
import url from 'url';
import querystring from 'querystring';

(function() {

  function getLocation() {
    var queryString;
  
    if (window.location.hash) {
      queryString = querystring.parse(window.location.hash.substr(1).replace('search?', ''))
    }
  
    return queryString || JSON.parse(localStorage.getItem('fydLocation'));
  }

  /**
   * @param {object} searchLocation 
   *
   */
  function handleSubmit() {
    var newUrl = {
      protocol: window.location.protocol,
      host: window.location.host,
      pathname: '/find-your-do',
      hash: 'search'
    };

    var searchLocation = JSON.parse(localStorage.getItem('fydLocation'));

    if (searchLocation) {
      window.location = url.format(newUrl) + '?' + 
        querystring.stringify(searchLocation);
    }
  }

  /**
   * @param {object} searchLocation 
   *
   */
  function setLocation(searchLocation) {

    // Make sure we have all the keys we need
//    var neededKeys = ['city', 'state', 'zip', 'lat', 'lon'];
//    Object.keys(searchLocation.forEach(function(key) {
//      if (!searchLocationKeys.find(key)) {
//        return;
//      }
//    });
    
    localStorage.setItem('fydLocation', JSON.stringify({
      city:  searchLocation.city,
      state: searchLocation.state,
      zip:   searchLocation.zip,
      lat:   searchLocation.lat,
      lon:   searchLocation.lon,
    }));
  }

  var whereWeAre = window.location.pathname;

  var searchLocation = getLocation();

  if (whereWeAre === '/find-your-do') {

    ReactDOM.render(
      <ResultsPage 
        searchLocation={getLocation()} 
        getLocation={getLocation}
        setLocation={setLocation}
        handleSubmit={handleSubmit}
      />,
      document.getElementById('findYourDoApp')
    );
  
  } else if (whereWeAre === '/') {

      console.log('homepage');
      ReactDOM.render(
        <HomePage 
          searchLocation={getLocation()} 
          setLocation={setLocation}
          handleSubmit={handleSubmit}
        />,
        document.getElementById('findYourDoApp')
      );

  } else {
      console.log('insidepage');
  }

})();
