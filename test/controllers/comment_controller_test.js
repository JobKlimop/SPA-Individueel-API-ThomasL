const mongoose = require('mongoose');
const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const User = mongoose.model('user');
const Comment = mongoose.model('comment');

describe('Comment controller', () => {

    beforeEach((done) => {
        let user = new User({
            username: 'CommentTest',
            firstName: 'Comment',
            lastName: 'Test',
            email: 'commenttest@test.com',
            password: 'commenttest'
        });
        let comment = new Comment({
            comment: 'testcomment',
        });

        comment.user = user;

        Promise.all([user.save(), comment.save()])
            .then(() => done());
    });

    it('finds all existing comments', (done) => {
        Comment.find({})
            .then(response => {
                console.log('COMMENTRESPONSE ' + response.toString());
                assert(response[0].comment === 'testcomment');
                done();
            });
    });
});