// import passport library for auth
const passport = require('passport');
// import passpoer strategy for google (note we are onlu interested in one property, Strategy)
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

// Tell passport how to make use of googlestrategy
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, 
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id })
                
            if (existingUser) {
                // we already have a record with the given profile ID
                done(null, existingUser);
            } else {
                // we don't have a user record with this ID, make a new record
                const user = await new User({ googleId: profile.id }).save();
                done(null, user);
            }
        }
    )
);