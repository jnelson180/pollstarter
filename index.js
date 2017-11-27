var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var db = mongoose.connection;
var assert = require('assert');
var User = require('./schema/User');
// console.log('user is ', User);

require('dotenv').config();

var url = process.env.MONGODB_URI;
let env = "development";

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.

var fbProfile = null;

passport.use(new Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/api/login/facebook/return'
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log('in passport.use, profile is fbProfile');
        fbProfile = profile;
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
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
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});


// Create a new Express application.
var app = express();

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
    extended: true
}));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// cant have this and CRA proxy
// if (env === "development") {
//     const proxy = require('express-http-proxy')
//     app.use('/*', proxy('http://localhost:3000'))
//   } else {
//     // probably serve up build version in production
//   }

app.get('/login',
    function (req, res) {
        res.send(req.user);
    });

app.get('/api/login/facebook',
    passport.authenticate('facebook'));

app.get('/api/login/facebook/return',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // need to fix this
        fbProfile = req.user;
        User.findOne({id: req.user.id})
            .exec((err, user) => {
                if (err) {
                    console.log(err);
                    return err;
                } else if (!user) {
                    console.log('user not found, creating.', err);
                    this.createUser();
                }
                console.log('logging in as', user.name)
                
            })
        console.log('redirecting to localhost:3000/');
        res.redirect('http://localhost:3000/');
    });

app.get('/profile',
    // require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        console.log('hit profile endpoint');
        const user = fbProfile;
        var userData = {
            id: user.id,
            name: user.displayName
        }

        mongoose.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log('connected to db!');

        
            User.create(userData, function (err, user) {
                console.log('inside user.create callback');
                if (err) {
                    console.log(err);
                    return next(err);
                } else {
                    console.log('user created');
                }
                res.end(JSON.stringify(userData));
            });
        });
    });

app.get('/dbTest', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");   
        res.end('success!');
        db.close();
    });
});

function createUser() {
    const user = fbProfile;
    var userData = {
        id: user.id,
        name: user.displayName
    }
    User.create(userData, function (err, user) {
        console.log('inside user.create callback');
        if (err) {
            console.log(err);
            return next(err);
        } else {
            console.log('user created');
        }
    });
}

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(5000);