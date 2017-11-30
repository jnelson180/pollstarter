import React, { Component } from 'react';
import './App.css';
import { Api } from './api/Api';
import { Button, Icon } from 'semantic-ui-react';
import Nav from './Nav';

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
                        <span className="welcome-text">Hi {this.state.user.name}!</span>
                    : null }
                </header>
                <Nav />
            </div>
        );
    }
}

export default App;
