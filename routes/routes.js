const UserController = require('../controllers/user_controller');
const ImageController = require('../controllers/image_controller');
const CommentController = require('../controllers/comment_controller');
const Authentication = require('../controllers/authentication');
const env = require('../config/env/env');
const jwt = require('express-jwt');
const auth = jwt({
    secret: 'SECRET_KEY',
    userProperty: 'payload'
});

module.exports = (app) => {

    app.get('/api', UserController.greetingTest);

    //Authentication
    app.post('/api/user/register', Authentication.register);
    app.post('/api/user/login', Authentication.login);

    //Accountrelated
    app.get('/api/user/', UserController.getAll);
    app.get('/api/user/:username', auth, UserController.getOne);
    app.put('/api/user/:username', UserController.edit);
    app.delete('/api/user/:username', auth, UserController.delete);

    //Images
    app.get('/api/images/:title', ImageController.getOne);
    app.get('/api/images/', ImageController.getAll);
    app.post('/api/images/:username', ImageController.create);
    app.put('/api/images/:id', auth, ImageController.edit);
    app.delete('/api/images/:id', auth, ImageController.delete);

    //Comments
    app.get('/api/comments/:id', CommentController.getOne);
    app.get('/api/comments', CommentController.getAll);
    app.post('/api/comments', auth, CommentController.create);
    app.put('/api/comments/:id', auth, CommentController.edit);
    app.delete('/api/comments/:id', auth, CommentController.delete);
};