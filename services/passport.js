const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const _ = require('lodash');

const User = mongoose.model('users');
const Email = mongoose.model('emails');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      const email =_.map( profile.emails, ({ value }) =>{ return value});

      if (existingUser) {
        return done(null, existingUser);
      }
      const addToEmailList = await new Email( {email: email[0].toString() }).save();
      const user = await new User({ googleId: profile.id, email: email[0] }).save();

      done(null, user, addToEmailList);
    }
  )
);