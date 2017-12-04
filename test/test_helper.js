const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/api');
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning: ', error);
        });
});

beforeEach(done => {
    const {users} = mongoose.connection.collections;
    Promise.all([users.drop()])
        .then(() => done())
        .catch(() => done());
});