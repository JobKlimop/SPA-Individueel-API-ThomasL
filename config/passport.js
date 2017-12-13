const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.use(new LocalStrategy((user, password, done) => {
    User.findOne({username: user}, function(err, user) {
        if(err) {
            return done(err);
        }
        if(!user) {
            return done(null, false, {
                message: 'User not found'
            });
        }
        // return if password is wrong
        if(!user.validatePassword(password)) {
            return done(null, false, {
                message: 'Password is wrong'
            });
        }
        // if all correct, return user object
        return done(null, user);
    });
}));