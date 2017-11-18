const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const path = require('path');
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require('cors');

require('dotenv').config();

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/api/login/facebook/callback'
    }, function(accessToken, refreshToken, profile, cb) {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        console.log(profile);
        return cb(null, profile);
    }));


  // Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// Create express app
var app = express();

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cookie-parser')())
app.use(cors());

// Init passport and restore auth state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Put all API endpoints under '/api'
app.get('/api/login/facebook', 
passport.authenticate('facebook', () => { console.log('woo-- authed?')}));

app.get('/api/login/facebook/callback', 
passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        console.log('redirecting to /');
        res.redirect('/loggedIn');
    });

    app.get('/api/login/facebook/return', 
    passport.authenticate('facebook', { failureRedirect: '/login' }, () => {console.log('at facebook/return')}),
        function(req, res) {
            console.log('redirecting to /');
            res.redirect('/loggedIn');
        });

app.get('/api/profile', require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
        console.log(req.user)
        res.send('profile', { user: req.user });
    });


app.get('/api/passwords', (req, res) => {
    console.log('received request...');
    passport.authenticate('local'), (req, res) => {
        console.log('REQQ', req);
        console.log('RESS', res);
        // Generate some passwords
        const passwords = ['s838S@JrK', 'nvo83du29$@d', '2bvUz!56rts'];

        const count = passwords.length;

        // Return them as json
        res.json(passwords);

        console.log(`Sent ${count} passwords`);
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// re enable this prior to deploy
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

app.get('*', (req, res) => {
    console.log('whoa,', 'REQQ:', req, 'RESS', res);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);