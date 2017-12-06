const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/user_test');
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning: ', err);
        });
});

beforeEach(done => {
    const {users} = mongoose.connection.collections;
    const {images} = mongoose.connection.collections;
    const {comments} = mongoose.connection.collections;
    Promise.all([users.drop(), images.drop(), comments.drop()])
        .then(() => done())
        .catch(() => done());
});
