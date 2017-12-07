const mongodb = require('../config/mongo.db');
const Image = require('../models/image');

module.exports = {

    getOne(req, res, next) {
        var imageId = req.params.id;

        Image.findOne({id: imageId})
            .then((image) => {
                res.status(200).send(image);
            })
            .catch(next);
    },

    getAll(req, res, next) {
        Image.find({})
            .then((images) => {
                res.status(200).send(images);
            })
            .catch(next);
    },

    create(req, res, next) {
        var body = req.body;

        Image.create(body)
            .then(image => {
                res.status(200);
                res.contentType('application/json');
                res.send(image);
            })
            .catch(next);
    },

    edit(req, res, next) {
        var body = req.body;
        var imageId = req.params.id;

        Image.findOneAndUpdate({id: imageId})
            .then(() => {
                res.status(200);
                res.contentType('application/json');
                res.send(body);
            })
            .catch(next);
    },

    delete(req, res, next) {
        var imageId = req.params.id;

        Image.findOneAndRemove({id: imageId})
            .then(image => {
                res.status(204).send(image);
            })
            .catch(next);
    }
};