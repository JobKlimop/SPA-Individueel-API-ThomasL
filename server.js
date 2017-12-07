var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var config = require('./config/env/env');
var routes = require('./routes/routes');

var app = express();

app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api.json'
}));

app.set('port', (process.env.PORT || config.env.webPort));
app.set('env', (process.env.ENV || 'development'));

// app.use(cors());
//TODO: Change to app.use(cors());
// CORS headers
// CROSS ORIGIN RESOURCE FORGERY
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With, Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware

    if( req.method === 'OPTIONS') {
        res.status(200);
        res.end();
    } else {
        next();
    }
});

routes(app);

//Fallback if no route succeedes
app.use('*', function(req, res) {
    res.status(400);
    res.json({
        'error': 'This URL is not available'
    });
});

//Connectie starten met de server.
app.listen(config.env.webPort, function() {
    console.log('The server is listening in port ' + app.get('port'));
});

module.exports = app;