'use strict';

var Dispatcher = require('../app-dispatcher');
var ServerActionCreators = require('../actions/server-action-creators');
var request = require('superagent');

module.exports = {

    _config: {
        url: 'http://api.example.com',
        apiKey: '',
    },

    _createUrl: function(param1, param2) {

        // TODO 
        // return [
        //     this._config.url,
        //     '?api-key=',
        //     this._config.apiKey,
        //     '&',
        //     param1,
        //     '=',
        //     encodeURI(param2)
        // ].join('');
    },

    search: function (param1, param2) {
        var url = this._createUrl(param1, param2)
    
        request
            .get(url)
            .end(function(err, res) {
                if (res) {
                    ServerActionCreators.receivedDataFromApi(res.body.results, res.error)
                }
            }.bind(this));
    },

}

