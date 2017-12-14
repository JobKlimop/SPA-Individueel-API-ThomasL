const mongodb = require('../config/mongo.db');
const Image = require('../models/image');
const neo4j = require('neo4j-driver').v1;
const User = require('../models/user');

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'neo4j'));
var session = driver.session();

module.exports = {

    getOne(req, res, next) {
        var imageId = req.params.id;

        Image.findOne({id: imageId})
            .then((image) => {
                res.status(200).send(image);
            })
            .catch(next);

        session
            .run("MATCH (a:Image{id:'" + imageId + "'}) RETURN a")
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

    getAll(req, res, next) {
        Image.find({})
            .then((images) => {
                res.status(200).send(images);
            })
            .catch(next);

        session
            .run('MATCH (n:Image) RETURN n')
            .then(result =>{
                var imageArray = [];

                result.records.forEach(record => {
                    imageArray.push({
                        id: record._fields[0].identity.low,
                        name: record._fields[0].properties.title
                    });
                    console.log(record._fields[0]);
                });
                res.status(200);
                res.json(imageArray);
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
            var inputName = req.params.username;

            Image.create(body)
                .then(image => {
                    User.findOne({username: inputName})
                        .then(user => {
                            user.images.push(image);
                            user.save();
                        });
                    res.status(200);
                    res.contentType('application/json');
                    res.send(image);
                })
                .catch(next);

            session
                .run("CREATE (a:Image{title:'" + body.title + "'}) " +
                    "SET a += {imageUrl:'" + body.imageUrl + "', " +
                    "description:'" + body.description + "', " +
                    "uploadDate:'" + body.uploadDate + "'}")
                .then(result => {
                    res.status(200);
                    res.json(result);
                    session.close();
                })
                .catch(error => {
                    console.log(error);
                });
    },

    edit(req, res, next) {
        if(!req.payload._id) {
            res.status(401).json({
                "message" : "UnauthorizedError: please log in first"
            });
        } else {
            var body = req.body;
            var imageId = req.params.id;

            Image.findOneAndUpdate({id: imageId})
                .then(() => {
                    res.status(200);
                    res.contentType('application/json');
                    res.send(body);
                })
                .catch(next);

            // TODO: Edit in neo4j
        }
    },

    delete(req, res, next) {
        if(!req.payload._id) {
            res.status(401).json({
                "message" : "UnauthorizedError: please log in first"
            });
        } else {
            var imageId = req.params.id;

            Image.findOneAndRemove({id: imageId})
                .then(image => {
                    res.status(204).send(image);
                })
                .catch(next);

            session
                .run("MATCH (a:Image{id:'" + imageID + "'}) DETACH DELETE a")
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