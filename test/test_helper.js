process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const env = require('../config/env/env');
var app = require('../app');

before(done => {
    mongoose.connect(env.dbDatabase);
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
