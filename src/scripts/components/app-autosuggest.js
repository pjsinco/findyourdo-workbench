var React = require('react');
var Autosuggest = require('react-autosuggest');

var languages = [
  {
    name: 'George',
    year: 1972
  },
  {
    name: 'Geoffrey',
    year: 2012
  },
  {
    name: 'Nolan',
    year: 1995
  },
  {
    name: 'Rod',
    year: 1991
  }
];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  var escapedValue = escapeRegexCharacters(value.trim()); 

  if (escapedValue === '') {
    return [];
  }

  var regex = new RegExp('^' + escapedValue, 'i');

    return languages.filter(function(language) {
        return regex.test(language.name);
    });
}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion.name;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

var AppAutosuggest = React.createClass({

    getInitialState: function() {
        return {
            value: '',
            suggestions: getSuggestions(''),
        };
    },  

    onChange: function(event, obj) {
      if (obj.method === 'type') {
        this.setState({
          value: obj.newValue,
          suggestions: getSuggestions(obj.newValue)
        });
      } else {
        this.setState({
          value: obj.newValue
        });
      }
    },

    // When suggestion is selected, we need to update `suggestions` so that,
    // if user presses Up or Down to reveal suggestions,
    // they would see the updated list.
    onSuggestionSelected: function(event, suggestionValue) {
      this.setState({
        suggestions: getSuggestions(suggestionValue)
      });
    },

    render: function() {
        var currentState = this.state;
        var inputProps = {
          placeholder: 'Type a programming language',
          value: currentState.value,
          onChange: this.onChange
        };

        return (
          <Autosuggest suggestions={currentState.suggestions}
                       getSuggestionValue={getSuggestionValue}
                       renderSuggestion={renderSuggestion}
                       inputProps={inputProps}
                       onSuggestionSelected={this.onSuggestionSelected} />
        );
    }

});

module.exports = AppAutosuggest;
