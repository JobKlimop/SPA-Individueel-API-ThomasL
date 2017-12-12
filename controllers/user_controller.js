const mongodb = require('../config/mongo.db');
const User = require('../models/user');
const neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'neo4j'));
var session = driver.session();

module.exports = {

    greetingTest(req, res, next) {
        res.status(200).json({test: 'Test succeeded'});
    },

    getAll(req, res, next) {
        User.find({})
            .then((users) => {
                res.status(200).send(users);
            })
            .catch(next);

        session
            .run('MATCH (n:User) RETURN n')
            .then(result =>{
                var userArray = [];

                result.records.forEach(record => {
                    userArray.push({
                        id: record._fields[0].identity.low,
                        name: record._fields[0].properties.username
                    });
                    console.log(record._fields[0]);
                });
                res.status(200);
                res.json(userArray);
                session.close();
            })
            .catch(error => {
                console.log(error);
            });
    },

    getOne(req, res, error) {
        const inputName = req.params.username;
        console.log(inputName);

        User.findOne({username: inputName})
            .then((user) => {
                console.log(user);
                res.status(200).send(user);
            })
            .catch((error) => res.status(401).json(error));

        session
            .run("MATCH (a:User{username:'" + inputName + "'}) RETURN a")
            .then(result => {
                console.log(JSON.stringify(result));
                res.status(200);
                res.json(result);
                session.close();
            })
            .catch(error => {
                console.log(error);
            });
    },

    create(req, res, next) {
        let body = req.body;
        console.log(body);

        User.create(body)
            .then(user => {
                res.status(200);
                res.contentType('application/json');
                console.log(user);
                res.send(user)
            })
            .catch(error => {
                console.log(error);
            });

        session
            .run("CREATE (a:User{username:'" + body.username + "'}) " +
                "SET a += {firstName:'" + body.firstName + "', " +
                "lastName:'" + body.lastName + "', " +
                "email:'" + body.email + "', " +
                "password:'" + body.password + "'}")
            .then(result => {
                res.status(200);
                res.json(result);
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

    edit(req, res, next) {
        let body = req.body;
        let inputName = req.params.username;

        User.findOneAndUpdate({username: inputName}, body)
            .then(() => {
            res.status(200);
            res.contentType('application/json');
            res.send(body);
            })
            .catch(next);
    },

    delete(req, res, next) {
        let inputName = req.params.username;

        User.findOneAndRemove({username: inputName})
            .then(user => {
                res.status(204).send(user)
            })
            .catch(next);

        session
            .run("MATCH (a:User{username:'" + inputName + "'}) DETACH DELETE a")
            .then(result => {
                res.status(200);
                res.json(result);
                session.close();
            })
            .catch(error => {
                console.log(error);
            })
    }
};