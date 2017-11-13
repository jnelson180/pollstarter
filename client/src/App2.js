import React, { Component } from 'react';
import './App.css';
import { Button } from 'antd';
var FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
var passport = require('passport');

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <Button onClick={() => {
                    this.fbLogin();
                }}>
                    Log In
                </Button>
            </div>
        );
    }

    fbLogin() {
        passport.use(new FacebookStrategy({
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET,
                callbackURL: "http://localhost:3000/auth/facebook/callback"
            },
            function(accessToken, refreshToken, profile, cb) {
                console.log(accessToken, refreshToken, profile, cb);
                // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
                //     return cb(err, user);
                // });
            }
        ));        
    }
}

export default App;
