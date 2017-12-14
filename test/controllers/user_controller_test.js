const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const User = mongoose.model('user');

describe('User controller', () => {

    const testUser = new User({
        username: 'Testuser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        password: 'testWord'
    });

    beforeEach((done) => {
        user = new User({
            username: 'Thomas',
            firstName: 'Thomas',
            lastName: 'Lucas',
            email: 'thomas641991@hotmail.com',
            password: 'Test'
        });
        user2 = new User({
            username: 'Testuser2',
            firstName: 'Test2',
            lastName: 'User2',
            email: 'test2@test2.com',
            password: 'test'
        });

        Promise.all([user.save(), user2.save()])
            .then(() => done());
    });

    it('GET to api/user/Thomas finds the user with the name Thomas', (done) => {
        request(app)
            .get('/api/user/Thomas')
            .expect(200)
            .then(response => {
                console.log('GET ' + response.body.username);
                assert(response.body.username === 'Thomas');
                done();
            });
    });

    it('POST to api/user creates a user', (done) => {
        User.count().then(count => {
            request(app)
                .post('/api/user/register')
                .send(testUser)
                .end(response => {
                    User.count().then(newCount => {
                        assert(newCount === count + 1);
                        done();
                    })
                })
        });
    });

    it('PUT to api/user/Testuser changes firstName to Henk', (done) => {
        user2.firstName = "Henk";
        request(app)
            .put('/api/user/' + user2.username)
            .send(user2)
            .end(response => {
                User.findOne({username: user2.username})
                    .then(user => {
                        console.log('PUT ' + user);
                        assert(user2.firstName === "Henk");
                        done();
                    })
            })
    });
});
