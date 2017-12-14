const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const passport = require('passport');

require('./config/passport');

const app = express();

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
    mongoose.createConnection('mongodb://localhost/imageDb');
} else {
    mongoose.createConnection('mongodb://localhost/imageDb_test');
}

app.use(bodyParser.json());

app.all('*', function(req, res, next){
    let token = (req.header('X-Access-Token')) || '';
    console.log(token);
    next();
});


// CORS headers for local deploy
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(passport.initialize());
routes(app);

app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name+ ": " + err.message});
    } else {
        res.status(422).send({error: err.message});
    }
});

module.exports = app;