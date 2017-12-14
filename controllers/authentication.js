const passport = require('passport');
const mongodb = require('../config/mongo.db');
const User = require('../models/user');
const neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver('bolt://hobby-jelgiahodeihgbkepmboijal.dbs.graphenedb.com:24786', neo4j.auth.basic('user', 'b.4hfYnarQ8VoK.54A0Rr4DN5JDRLmj'));
var session = driver.session();

module.exports = {

    register(req, res, next) {
        let body = req.body;
        console.log(body);

        let user = new User();
        user.username = body.username;
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.email = body.email;
        user.setPassword(req.body.password);

        User.create(user)
            .then(user => {
                let token;
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token" : token
                });
                res.contentType('application/json');
                console.log("Mongo sent: " + user);
                res.send(user)
            })
            .catch(error => {
                console.log(error);
                return;
            });

        session
            .run("CREATE (a:User{username:'" + body.username + "'}) " +
                "SET a += {firstName:'" + body.firstName + "', " +
                "lastName:'" + body.lastName + "', " +
                "email:'" + body.email + "'}")
            .then(result => {
                res.status(200);
                res.json(result);
                console.log("NEO4J SENT: " + JSON.stringify(result));
                session.close();
            })
            .catch(error => {
                console.log(error);
            });

        // TODO: Create a security for no duplicate users in Neo4J
        // session
        //     .run("MATCH (a:User{username:'" + body.username + "'}) RETURN a")
        //     .then(result => {
        //         console.log("RESULT: " + JSON.stringify(result));
        //         var resultArr = [];
        //
        //         result.records.forEach(record => {
        //             resultArr.push({
        //                 resultconsumedafter: record.summary.resultConsumedAfter.low
        //             });
        //             console.log("RESULTARR: " + JSON.stringify(resultArr));
        //         });
        //         if(resultArr.resultconsumedafter > 0){
        //             res.status(400);
        //             res.json('User already exists');
        //             session.close();
        //         } else {
        //             session
        //                 .run("CREATE (a:User{username:'" + body.username + "'}) " +
        //                     "SET a += {firstName:'" + body.firstName + "', " +
        //                     "lastName:'" + body.lastName + "', " +
        //                     "email:'" + body.email + "', " +
        //                     "password:'" + body.password + "'}")
        //                 .then(result => {
        //                     res.status(200);
        //                     res.json(result);
        //                     session.close();
        //                 })
        //                 .catch(error => {
        //                     console.log(error);
        //                 })
        //
        //         }
        //     });
    },

    login(req, res, next) {
        console.log('TEST');
        passport.authenticate('local', function(err, user, info){
            let token;
            console.log('1: ' + token);
            console.log(req);

            //if Passport throws or catches an error
            if(err) {
                res.status(404).json(err);
                console.log(err);
                return;
            }

            //if a user is found
            if(user) {
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token" : token
                });
            } else {
                res.status(401).json(info);
            }
        })(req, res);
    }
};