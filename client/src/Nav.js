import React, { Component } from 'react';

class Nav extends Component {
    render() {
        return (
            <div>
                <a href="/">Home</a>&nbsp;|&nbsp;
                <a href="/Create">Create</a>&nbsp;|&nbsp;
                <a href="/manage">Manage</a>&nbsp;|&nbsp;
                <a href="/profile">Profile</a>
            </div>
        );
    }
}

export default Nav;