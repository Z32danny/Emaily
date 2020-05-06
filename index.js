// import express
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// require passport.js file
require('./services/passport');
require('./models/User');

mongoose.connect('mongodb+srv://danielruizgc8:Fj4BlhsVUccBLEVc@emaily-saatm.mongodb.net/test?retryWrites=true&w=majority');

// initiate express app instance
const app = express(keys.mongoURI);

// little trick: require statement(that returns a function), then immediately call that function with the app object
require('./routes/authRoutes')(app);

// configure dynamic port binding for heroku
const PORT = process.env.PORT || 5000
app.listen(PORT);