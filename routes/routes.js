const UserController = require('../controllers/user_controller');
const ImageController = require('../controllers/image_controller');
const CommentController = require('../controllers/comment_controller');

module.exports = (app) => {
    app.get('/api/user/:name', UserController.getOne);
    app.post('api/user', UserController.create);
    app.put('/api/user/:name', UserController.edit);
    app.delete('api/user/:name', UserController.delete);

    app.get('/api/images/:id', ImageController.GetOne);
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