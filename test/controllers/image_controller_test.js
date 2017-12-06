const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const User = mongoose.model('user');
const Image = mongoose.model('image');

describe('Image controller', () => {

    beforeEach((done) => {
        const user = new User({
            username: 'ImageTest',
            firstName: 'Image',
            lastName: 'Test',
            email: 'imagetest@test.com',
            password: 'test'
        });

        let image = new Image({
            title: 'TestImage',
            imageUrl: 'https://www.w3schools.com/w3css/img_fjords.jpg',
            description: [{
                description: 'This is a test',
                uploadDate: Date.now()
            }],
            likes: 5
        });

        user.images.push(image);

        console.log('USERLOG ' + user);
        Promise.all([user.save(), image.save()])
            .then(() => done());
    });

    it('finds all images with GET request', (done) => {
        Image.find({})
            .then(response => {
                // console.log(response);
                console.log('IMAGEDESCRIPTION ' + response.toString());
                assert(response[0].title === 'TestImage');
                done();
            });
    });

    // it('adds an image with a user with POST request', (done) => {
    //     User.findById(user._id)
    //         .then(() => {
    //             request(app)
    //                 .post('/api/images')
    //                 .send()
    //         })
    // });
});