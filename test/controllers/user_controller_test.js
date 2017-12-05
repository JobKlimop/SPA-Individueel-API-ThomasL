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

    it('GET to api/user/Thomas finds the user with the name Thomas', (done) => {
        request(app)
            .get('/api/user/Thomas')
            // .expect(function(res) {
            //     console.log(res.body.username);
            //     res.body.username === 'Kim';
            // })
            .expect(200)
            .then(response => {
                console.log(response.body.username);
                assert(response.body.username, 'Thomas')
            });
        done();
    });


    it('DELETE to api/user/:name can delete a user', (done) => {
        console.log('Delete ' + user.username);

        request(app)
            .delete('/api/user/' + user.username)
            .expect(204)
            .end(done);
    })
});