const mongodb = require('../config/mongo.db');
const User = require('../models/user');

module.exports = {
    getOne(req, res, next) {
        var inputName = req.params.name;

        User.findOne({name: inputName})
            .then((user) => {
            res.status(200).send(user);
            })
            .catch(next);
    },

    create(req, res, next) {
        var body = req.body;

        User.create(body)
            .then(user => {
                res.status(200);
                res.contentType('application/json');
                console.log(user);
                res.send(user)
            })
            .catch(next);
    },

    edit(req, res, next) {
        var body = req.body;
        var inputName = req.params.name;

        User.findOneAndUpdate({name: inputName}, body)
            .then(() => {
            res.status(200);
            res.contentType('application/json');
            res.send(body);
            })
            .catch(next);
    },

    delete(req, res, next) {
        var inputName = req.params.name;

        User.findOneAndRemove({name: inputName})
            .then(user => {
                res.status(204).send(user)
            })
            .catch(next);
    }
};