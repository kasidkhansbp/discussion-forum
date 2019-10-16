import React from 'react';
import Button from 'react-bootstrap/Button';

class LoginComponent extends React.PureComponent<any> {

    render() {
      return (
          <div className="login">
            <Button  variant="danger" className="button" href="http://localhost:3001/session/google/login">Sign in with Google</Button>
            <Button  variant="primary" className="button" href="http://localhost:3001/session/facebook/login">Sign in with Facebook</Button>
          </div>
          )
  };
  }

  export default LoginComponent;