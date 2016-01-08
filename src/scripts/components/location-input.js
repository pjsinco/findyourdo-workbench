var React = require('react');
var Autosuggest = require('react-autosuggest');
var request = require('superagent');
var _ = require('lodash');

function getMatchingLocations(value) {
    var escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }
    
    var regex = new RegExp('^' + escapedValue, 'i');

    return locations.filter(function(location) {
        return regex.test(location.city);
    });
}

/* ----------- */
/*    Utils    */
/* ----------- */

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/
//      Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function searchingByZip(value) {
    var hasNumber = /\d/;
    return hasNumber.test(value);
}

/* --------------- */
/*    Component    */
/* --------------- */



var LocationInput = React.createClass({

    _getSuggestionValue: function(suggestion) {

        if (!searchingByZip(this.state.value)) {
            return suggestion.city + ', ' + suggestion.state;
        } 

        return suggestion.city + ', ' + suggestion.state + ' ' + suggestion.zip;
    },

    renderSuggestion: function(suggestion) {
        if (!searchingByZip(this.state.value)) {
            return (
                <span>{suggestion.city + ', ' + suggestion.state}</span>
            );
        }

        return (
            <span>{suggestion.city + ', ' + suggestion.state + ' ' + suggestion.zip}</span>
        );
    },

    getInitialState: function() {
        var value = '';

        if (this.props.searchLocation) {
            value = this.props.searchLocation.city + ', ' +
                this.props.searchLocation.state;
        }
        return {
            value: value,
            suggestions: getMatchingLocations(''),
        };
    },

    shouldRenderSuggestions(value) {
        return value.trim().length > 2;
    },

    debouncedLoadSuggestions: _.debounce(function(value) {
        var escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        var self = this;
        request
            .get('http://lookup.findyourdo.org/api/v1/locations/search?q=' + escapedValue)
            .end(function(err, res) {
                
                var regex = new RegExp('^' + escapedValue, 'i');

                if (!searchingByZip(value)) {
                    var uniqueLocations = _.uniq(res.body.data, false, function(location) {
                        return [location.city, location.state].join();
                    });

                    var suggestions = uniqueLocations.filter(function(location) {
                        // include comma match "napa, c" to "Napa, CA"
                        // TODO Shouldn't matter if there's a space after the comma.
                        //      So: "napa,c" matches "Napa, CA"
                        return regex.test(location.city + ', ' + location.state);
                    });
                } else {
                    var suggestions = res.body.data.filter(function(location) {
                        return regex.test(location.zip);
                    });
                }


                //if (value === self.state.value) {
                  self.setState({
                    suggestions
                  });
                //} 

            });
    }, 200),

    _handleLocationSelected: function() {
       this.props.handleLocationSelected(this.state.value);
    },

    loadSuggestions: function(value) {
        var escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        var self = this;
        request
            .get('http://lookupapi.dev/api/v1/locations/search?q=' + escapedValue)
            .end(function(err, res) {
                
                var regex = new RegExp('^' + escapedValue, 'i');

                if (!searchingByZip(value)) {
                    var uniqueLocations = _.uniq(res.body.data, false, function(location) {
                        return [location.city, location.state].join();
                    });

                    var suggestions = uniqueLocations.filter(function(location) {
                        return regex.test(location.city);
                    });
                } else {
                    var suggestions = res.body.data.filter(function(location) {
                        return regex.test(location.zip);
                    });
                }


                //if (value === self.state.value) {
                  self.setState({
                    suggestions
                  });
                //} 

            });
    
    },

    getSuggestions: function(value, object) {
        var debounce = object.debounce || false;
        var self = this;

        if (debounce) {
            this.debouncedLoadSuggestions(value);
        } else {
            this.loadSuggestions(value);
        }

    },

    onChange: function(event, object) {
        this.setState({
            value: object.newValue,
        });
        
        if (object.method === 'type') {
            this.getSuggestions(object.newValue, { debounce: true });
        }
    },

    onSuggestionSelected: function(evt, object) {
        //this.loadSuggestions(object.suggestionValue);
        this.props.handleLocationSelected(object.suggestion);
    },

  render: function() {
    //const { value, suggestions, isLoading } = this.state;
    var currState = this.state;
    var inputProps = {
      placeholder: "City and state or zip",
      value: currState.value,
      onChange: this.onChange
    };
    return (
        <Autosuggest suggestions={currState.suggestions}
                     getSuggestionValue={this._getSuggestionValue}
                     renderSuggestion={this.renderSuggestion}
                     inputProps={inputProps}
                     onSuggestionSelected={this.onSuggestionSelected}
                     shouldRenderSuggestions={this.shouldRenderSuggestions}
        />
    );
  }
});

module.exports = LocationInput;
