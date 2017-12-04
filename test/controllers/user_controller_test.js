const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const User = mongoose.model('user');

describe('User controller', () => {

    beforeEach((done) => {
        user = new User({
            username: 'Thomas',
            firstName: 'Thomas',
            lastName: 'Lucas',
            email: 'thomas641991@hotmail.com'
        });

        user.save()
            .then(() => done());
    });

    it('GET to api/user/Thomas finds the user with the names Thomas', (done) => {
        request(app)
            .get('/api/user/Thomas')
            .expect(function(res) {
                res.body.name = 'Thomas';
            })
            .expect(200, done)
    });

    it('DELETE to api/user/:name can delete a user', (done) => {
        User.findOneAndRemove({name: 'Thomas'})
            .then(() => User.findOne({name: 'Thomas'}))
            .then((user) => {
            assert(user === null);
            done()
            });
    });
});