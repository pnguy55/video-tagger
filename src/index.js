const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('../models/User');
require('../services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());
require('../routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
});