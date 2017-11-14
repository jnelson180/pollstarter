import React, { Component } from 'react';
import './App.css';
import { Button } from 'antd';
// var FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
// var passport = require('passport');

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            passwords: []
        }
    }
    // Fetch passwords after first mount
    componentDidMount() {
        this.getPasswords();
    }

    getPasswords = () => {
        // Get the passwords and store them in state
        fetch('/api/passwords')
            .then(res => res.json())
            .then(passwords => this.setState({ passwords }));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Pollstarter</h1>
                </header>
                <p className="App-intro">
                    {this.state.passwords}
                </p>
                <Button onClick={() => {
                    // this.fbLogin();
                }}>
                    Log In
                </Button>
            </div>
        );
    }

    // fbLogin() {
    //     passport.use(new FacebookStrategy({
    //             clientID: process.env.FACEBOOK_APP_ID,
    //             clientSecret: process.env.FACEBOOK_APP_SECRET,
    //             callbackURL: "http://localhost:3000/auth/facebook/callback"
    //         },
    //         function(accessToken, refreshToken, profile, cb) {
    //             console.log(accessToken, refreshToken, profile, cb);
    //             // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //             //     return cb(err, user);
    //             // });
    //         }
    //     ));        
    // }
}

export default App;
