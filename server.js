var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var config = require('./config/env/env');
var routes = require('./routes/routes')

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

routes(app);

//Fallback if no route succeedes
app.use('*', function(req, res) {
    res.status(400);
    res.json({
        'error': 'Deze URL is niet beschikbaar'
    });
});

//Connectie starten met de server.
app.listen(config.env.webPort, function() {
    console.log('De server luistert op port ' + app.get('port'));
});

module.exports = app;