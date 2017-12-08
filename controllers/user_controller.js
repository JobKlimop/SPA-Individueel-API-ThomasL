const mongodb = require('../config/mongo.db');
const User = require('../models/user');

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
            // .catch(next);
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
    }
};