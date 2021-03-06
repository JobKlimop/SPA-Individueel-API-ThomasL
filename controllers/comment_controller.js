const mongodb = require('../config/mongo.db');
const Comment = require('../models/comment');
const neo4j = require('neo4j-driver').v1;
const Image = require('../models/comment');

var driver = neo4j.driver('bolt://hobby-jelgiahodeihgbkepmboijal.dbs.graphenedb.com:24786', neo4j.auth.basic('user', 'b.4hfYnarQ8VoK.54A0Rr4DN5JDRLmj'));
var session = driver.session();

module.exports = {

    getOne(req, res, next) {
        var commentId = req.params.id;

        Comment.findOne({id: commentId})
            .then((comment) => {
                res.status(200).send(comment);
            })
            .catch(next);

        session
            .run("MATCH (a:Comment{id: '" + commentId + "'}) RETURN a")
            .then(result => {
                res.status(200);
                res.json(result);
                session.close();
            })
            .catch(error => {
                console.log(error);
            });
    },

    getAll(req, res, next) {
        Comment.find({})
            .then((comments) => {
                res.status(200).send(comments);
            })
            .catch(next);

        session
            .run("MATCH (a:Comment} RETURN a")
            .then(result => {
                var commentArr = [];

                result.records.forEach(record => {
                    commentArr.push({
                        id: record._fields[0].identity.low,
                        comment: record._fields[0].properties.comment
                    });
                });
                res.status(200);
                res.json(commentArr);
                session.close();
            })
            .catch(error => {
                console.log(error);
            });
    },

    create(req, res, next) {
        // if(!req.payload._id) {
        //     res.status(401).json({
        //         "message" : "UnauthorizedError: please log in first"
        //     });
        // } else {
            var body = req.body;
            var id = req.params.id;

            console.log(id);

            Comment.create(body)
                .then(comment => {
                    Image.findOne({id: id})
                        .then(image => {
                            console.log(JSON.stringify(image));
                            image.comment.push(comment);
                            image.save();
                        });
                    res.status(200);
                    res.contentType('application/json');
                    res.send(comment);
                })
                .catch(next);

            // session
            //     .run("CREATE (a:Comment{comment:'" + body.comment + "'})")
            //     .then(result => {
            //         res.status(200);
            //         res.json(result);
            //         session.close();
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });
        // }
    },

    edit(req, res, next) {
        if(!req.payload._id) {
            res.status(401).json({
                "message" : "UnauthorizedError: please log in first"
            });
        } else {
            var body = req.body;
            var commentId = req.params.id;

            Comment.findOneAndUpdate({id: commentId})
                .then(() => {
                    res.status(200);
                    res.contentType('application/json');
                    res.send(body);
                })
                .catch(next);
        }
    },

    delete(req, res, next) {
        if(!req.payload._id) {
            res.status(401).json({
                "message" : "UnauthorizedError: please log in first"
            });
        } else {
            var commentId = req.params.id;

            Comment.findOneAndRemove({id: commentId})
                .then(comment => {
                    res.status(204).send(comment);
                })
                .catch(next);

            session
                .run("MATCH (a:Comment{id:'" + commentId + "'}) DETACH DELETE a")
                .then(result => {
                    res.status(200);
                    res.json(result);
                    session.close();
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
};