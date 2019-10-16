import Button from 'react-bootstrap/Button';
import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { AppData } from '../data/dataType';
import { LinkContainer } from 'react-router-bootstrap';
import LoginComponent from '../components/LoginComponent';

interface Props {
  loginStatus?:any;
}

const mapStateToProps = (state: AppData) => ({ loginStatus: state.loginStatus });

class HomeComponent extends React.PureComponent<Props> {

  render() {
    return (
      <div className="container">
        <div className="place-holder">
          <h1>Fresher's Community</h1>
          <p>This is a community dedicated to bring like minded freshers to discuss about coding,<br/>
      placements, careers and career quidance.</p>
          {this.props.loginStatus.loginStatus? <LoggedInComponent/>: <LoginComponent/>}
        </div>
      </div>
        )
};
}

function LoggedInComponent() {
  return(
    <div className="loggedIn">
    <Form>
  <Form.Group controlId="formSearch">
    <Form.Control type="text" placeholder="Search..." />
  </Form.Group>
  <Button variant="outline-success" type="submit">
    Search
  </Button>
  <LinkContainer to="/add-discussion">
        <Button variant="primary" id="ask-a-question-button">Ask a Question?</Button>
      </LinkContainer>
</Form>
    </div>

  )
}

export default connect(mapStateToProps, null)(HomeComponent);
