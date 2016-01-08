var express = require('express');
var jade = require('jade');

var app = express();

var nav = [
    {
        text: 'FYD',
        link: '/find-your-do'
    },
];


/**
 * View engine
 *
 */
app.set('views', (__dirname + '/views'));
app.set('view engine', 'jade');

/**
 * Middleware
 *
 */
app.use(express.static(__dirname + '/dist'));

var port = process.env.PORT || 5000;

/**
 * Routes
 *
 */
app.get('/', function(req, res) {

    res.render('index', {
        title: 'hiya',
        nav: nav,
    });
});

app.get('/find-your-do', function(req, res) {
    res.render('find-your-do', {
        title: 'Find Your DO Search',
        nav: nav,
        activeNavItem: 'FYD'
    });
});


/**
 * Listen
 *
 */
app.listen(port, function() {
    console.log('Running server on port ' + port);
});
