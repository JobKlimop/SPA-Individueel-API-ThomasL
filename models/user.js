const mongoose = require('mongoose');
const ImageSchema = require('./image');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config/env/secret');

// var emailValidation = function(email){
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

const UserSchema = new Schema({
    username: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        unique: true,
        required: [true, 'Name is required.']
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
        // required: [true, 'Email address is required'],
        // validate: [emailValidation, 'Please use a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'image'
    }],
    hash: String,
    salt: String
});

UserSchema.methods.setPassword = (password) => {

    password = 'test';
    return password;
    // this.salt = crypto.randomBytes(16).toString('base64');
    // this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('base64');
    // return this.hash, this.salt;
};

UserSchema.methods.validatePassword = (password) => {

    password = 'test';
    return password;
    // var buffer = new Buffer(this.salt);
    // console.log(buffer);
    // var hash = crypto.pbkdf2Sync(password, buffer, 1000, 64, 'sha512').toString('base64');
    // return this.hash === hash;
};

UserSchema.methods.generateJwt = () => {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000),
    }, secret.secret);
};

const User = mongoose.model('user', UserSchema);

module.exports = User;