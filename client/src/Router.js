import * as React from 'react';
import Login from './Login';
import App from './App';
import CreatePoll from './CreatePoll';

var BrowserRouter = require('react-router-dom').BrowserRouter
var Route = require('react-router-dom').Route
// var Link = require('react-router-dom').Link

export default () => {
    return (
        <BrowserRouter>
            <div>
                <Route path="/login" component={Login} />
                <Route path="/home" component={App} />
                <Route path="/create" component={CreatePoll} />
            </div>
        </BrowserRouter>
    );
}