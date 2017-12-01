import React, { Component } from 'react';
import { Api } from './api/Api';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('cwm');
        Api.getFbProfile()
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                Profile
            </div>
        );
    }
}

export default Profile;