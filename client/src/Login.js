import React, { Component } from 'react';
import './App.css';
import { Api } from './api/Api';
import { Button, Icon } from 'semantic-ui-react';
import Nav from './Nav';
import background from './background.jpg';

require('dotenv').config();

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    componentWillMount() {
        console.log(process.env.PUBLIC_URL);
        console.log(window.location);
        Api.getUser()
            .then((res) => {
                this.setState({user: res});
            })
            .catch((error) => { console.log(error) });
    }

    render() {
        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100vw",
                height: "100vh",
                background: "url('" + background + "')",
                backgroundSize: "cover"
            }}>
                <h1 className="App-jumbo">Pollstarter</h1>
                <a href="http://localhost:5000/api/login/facebook">
                    <Button color="facebook">
                        <Icon name="facebook" />Login with Facebook
                    </Button>
                </a>
            </div>
        );
    }
}

export default Login;
