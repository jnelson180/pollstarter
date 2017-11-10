import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
			<div>
				<br />
				<p>Pollstarter</p>
				<a href="/auth/github">
					<div>
						<img src="/public/img/github_32px.png" alt="github logo" />
						<p>LOGIN WITH GITHUB</p>
					</div>
				</a>
			</div>            
        )
    }
}