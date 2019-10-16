import React from 'react';
import LoginComponent from '../components/LoginComponent';

class LoginPage extends React.PureComponent<any> {

    render() {
        return(
            <div>
                <div className="login-component">
                    <div>
                        <p>Sign in to ask Questions.</p>
                        <LoginComponent />
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage