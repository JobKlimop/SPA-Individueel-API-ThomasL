const mongodb = require('../config/mongo.db');
const Comment = require('../models/comment');

module.exports = {

    getOne(req, res, next) {
        var commentId = req.params.id;

        Comment.findOne({id: commentId})
            .then((comment) => {
                res.status(200).send(comment);
            })
            .catch(next);
    },

    getAll(req, res, next) {
        Comment.find({})
            .then((comments) => {
                res.status(200).send(comments);
            })
            .catch(next);
    },

    create(req, res, next) {
        var body = req.body;

        Comment.create(body)
            .then(comment => {
                res.status(200);
                res.contentType('application/json');
                res.send(comment);
            })
            .catch(next);
    },

    edit(req, res, next) {
        var body = req.body;
        var commentId = req.params.id;

        Comment.findOneAndUpdate({id: commentId})
            .then(() => {
                res.status(200);
                res.contentType('application/json');
                res.send(body);
            })
            .catch(next);
    },

    delete(req, res, next) {
        var commentId = req.params.id;

        Comment.findOneAndRemove({id: commentId})
            .then(comment => {
                res.status(204).send(comment);
            })
            .catch(next);
    }
};