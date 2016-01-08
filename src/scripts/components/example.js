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

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSearchType(value) {
    if (typeof value !== "number" && isNaN(value)) {
        return 'city';
    } 

    return 'zip';
}

/* --------------- */
/*    Component    */
/* --------------- */

function getSuggestionValue(suggestion) {
    return suggestion.city + ', ' + suggestion.state;
}


var App = React.createClass({

    renderSuggestion: function(suggestion) {
        if (getSearchType(this.state.value) === 'city') {
            return (
                <span>{suggestion.city + ', ' + suggestion.state}</span>
            );
        }

        return (
            <span>{suggestion.city + ', ' + suggestion.state + ' ' + suggestion.zip}</span>
        );
    },

    getInitialState: function() {
        return {
            value: '',
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

                if (getSearchType(value) === 'city') {
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

    }, 200),

    loadSuggestions: function(value) {
console.log('loadingsuggestions', value);
        var escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        var self = this;
        request
            .get('http://lookupapi.dev/api/v1/locations/search?q=' + escapedValue)
            .end(function(err, res) {
                
                var regex = new RegExp('^' + escapedValue, 'i');

                if (getSearchType(value) === 'city') {
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
            //_.debounce(self.loadSuggestions, 200);
            //self.loadSuggestions(value);
            //this.debouncedLoadSuggestions(object.newValue);
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
    this.loadSuggestions(object.suggestionValue);
  },

  render: function() {
    //const { value, suggestions, isLoading } = this.state;
    var currState = this.state;
    var inputProps = {
      placeholder: "Type 'c'",
      value: currState.value,
      onChange: this.onChange
    };
    return (
        <Autosuggest suggestions={currState.suggestions}
                     getSuggestionValue={getSuggestionValue}
                     renderSuggestion={this.renderSuggestion}
                     inputProps={inputProps}
                     onSuggestionSelected={this.onSuggestionSelected}
                     shouldRenderSuggestions={this.shouldRenderSuggestions}
        />
    );
  }
});

module.exports = App;
