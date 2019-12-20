#Passport for this app
*** npm i env-cmd --save-dev
1) npm i --save passport passport-google-oauth20 cookie-session
2) import the following modules
    const passport = require('passport');
    const GoogleStrategy = require('passport-google-oauth20').Strategy;

3) Use the following method call
// Creates new instance of the GoogleStrategy
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // this route will be added later
        callbackURL: '/auth/google/callback'
    },
    accessToken => {
        console.log(accessToken);
    })
);

4) Make a new project on google API website at
    console.developers.google.com
5) Select that project from a dropdown
6) Enable google oAuth API from that website
7) SEARCH GOOGLE+ API FROM THE LIST
8) Create credentials by not clicking the create button, but by clicking credentials on the left sidebar
9) Select OAuth Client id from this create credential dropdown
10) Make a consent screen - only field necessary is the app name
11) Web app
12) Name of web app
    [name]
    Authorized Javascript origin
    http://localhost:3000
    Authorized redirect url
    http://localhost:3000/auth/google.callback
13) Create
14) Copy client ID and secret in dev.env file
15) add that file to .gitignore
16) create the callback function and route for the passport callback

17) create project on mongo and install mongoose

18) set up user models and feed into passport service
19) set up serialization, deserialization
20) set up cookie-session module
21) REMEMBER TO CALL THE AUTH ROUTES AFTER THE COOKIE AND SESSION IS CREATED
22) make a logout route
23) create another DB, and another set of all API keys for prod environment
24) redeploy to heroku
25) start on front-end