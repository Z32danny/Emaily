// import passport library for auth
const passport = require('passport');
// import passpoer strategy for google (note we are onlu interested in one property, Strategy)
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// Tell passport how to make use of googlestrategy
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, 
        (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
        }
    )
);