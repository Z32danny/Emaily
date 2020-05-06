// import express
const express = require('express');
// require passport.js file
require('./services/passport');

// initiate express app instance
const app = express();

// little trick: require statement(that returns a function), then immediately call that function with the app object
require('./routes/authRoutes')(app);

// configure dynamic port binding for heroku
const PORT = process.env.PORT || 5000
app.listen(PORT);