import React, { Component } from 'react';
import './App.css';
import { Api } from './api/Api';
import { Button, Icon } from 'semantic-ui-react';
require('dotenv').config();

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    componentWillMount() {
        Api.getUser()
            .then((res) => {
                console.log(res);
                this.setState({user: res});
            })
            .catch((error) => { console.log(error) });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Pollstarter</h1>
                    {this.state.user ?
                    <span className="welcome-text">Hi {this.state.user.displayName}!</span>
                    : null }
                </header>
                { !this.state.user ? 
                <a href="http://localhost:5000/api/login/facebook">
                    <Button color="facebook">
                        <Icon name="facebook" />Login with Facebook
                    </Button>
                </a> : null }
                <br />
                <a href="http://localhost:3000/profile">Profile</a>
            </div>
        );
    }
}

export default App;
