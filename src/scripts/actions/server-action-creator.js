'use strict';

var Dispatcher = require('../app-dispatcher');
var Api = require('../utils/app-web-api-utils');
var AppConstants = require('../app-constants');
var request = require('superagent');

var ActionTypes = AppConstants.ActionTypes;

var ServerActionCreators = {

    receivedDataFromApi: function(data, errors) {
        Dispatcher.dispatch({
            type: ActionTypes.Server.API_RESPONSE,
            apiData: {
                data: data, 
                errors: errors,
            },
        });
    },


};
module.exports = ServerActionCreators;

