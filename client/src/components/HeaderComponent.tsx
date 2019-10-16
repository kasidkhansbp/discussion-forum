import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import '../App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { AppData } from '../data/dataType';
import api from '../services/remote/api';
import { ThunkDispatch } from 'redux-thunk';

interface Props {
  loginStatus: any;
  logOut: () => void,
  checkLoginStatus: () => void,
}

const mapStateToProps = (state: AppData) => ({ loginStatus: state.loginStatus });

const mapDispatchToProps = (dispatch: ThunkDispatch<AppData, any, any>) => ({
    logOut: () => dispatch(api.logout()),
    checkLoginStatus: () => dispatch(api.checkUserLoggedInStatus())
})

class HeaderComponent extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    props.checkLoginStatus();
  }

  render(){
      return(      
        <Navbar fixed="top" bg="light" expand="lg">
          <LinkContainer to="/home">
            <Navbar.Brand>Forum</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/discussion">
                <Nav.Link >Discussion</Nav.Link>
              </LinkContainer>
            </Nav>
            <LinkContainer to={this.props.loginStatus.loginStatus?'/add-discussion':'/login'}>
            <Button variant="primary" id="ask-a-question-button">Ask a Question?</Button>
            </LinkContainer>
          <Form inline>
            <FormControl type="text" placeholder="Search..." className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            {this.props.loginStatus.loginStatus && <Button variant="link" onClick={()=>this.props.logOut()}>Logout</Button>}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
}
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
