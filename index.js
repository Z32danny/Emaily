// import express
const express = require('express');
const mongoose = require('mongoose');
// to inform express about handling cookies
const cookieSession = require('cookie-session');
// to tell passport to deal with cookies
const passport = require('passport');
const keys = require('./config/keys');
// require passport.js file
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

// initiate express app instance
const app = express(keys.mongoURI);

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

// little trick: require statement(that returns a function), then immediately call that function with the app object
require('./routes/authRoutes')(app);

// configure dynamic port binding for heroku
const PORT = process.env.PORT || 5000
app.listen(PORT);