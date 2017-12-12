const UserController = require('../controllers/user_controller');
const ImageController = require('../controllers/image_controller');
const CommentController = require('../controllers/comment_controller');

module.exports = (app) => {

    app.get('/api', UserController.greetingTest);

    app.get('/api/user/', UserController.getAll);
    app.get('/api/user/:username', UserController.getOne);
    app.post('/api/user/register', UserController.create);
    app.put('/api/user/:username', UserController.edit);
    app.delete('/api/user/:username', UserController.delete);

    app.post('/api/user/login');

    app.get('/api/images/:id', ImageController.getOne);
    app.get('/api/images/', ImageController.getAll);
    app.post('/api/images', ImageController.create);
    app.put('/api/images/:id', ImageController.edit);
    app.delete('/api/images/:id', ImageController.delete);

    app.get('/api/comments/:id', CommentController.getOne);
    app.get('/api/comments', CommentController.getAll);
    app.post('/api/comments', CommentController.create);
    app.put('/api/comments/:id', CommentController.edit);
    app.delete('/api/comments/:id', CommentController.delete);
};