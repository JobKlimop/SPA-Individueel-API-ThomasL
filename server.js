var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var config = require('./config/env/env');

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

app.use(cors());