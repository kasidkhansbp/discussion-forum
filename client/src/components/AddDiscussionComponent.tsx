import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../services/remote/api';
import { LinkContainer } from 'react-router-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { notify } from './NotificationComponent';
import Routes from './../data/routes';
import {withRouter} from 'react-router-dom';

interface State {
    validated?: boolean,
    addDiscussionServerError?: boolean,
    title?: string,
    description?: string
}
class AddDiscussionComponent extends React.PureComponent<any, State> {

    state: State = {
        validated: false,
        addDiscussionServerError: false,
    }

    setValidated = (data:any) => {
        this.setState({validated:data});
    }
    
    submitHandler = (e: any) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
    } else {
      api.addDiscussion({title: this.state.title, description: this.state.description}).then(response=> {
        // this section needs to have seperte catch since any error in this code will be caught by api catch error.
        const {id} = response.data;
        this.setState({addDiscussionServerError: false}) // update state to false for user who added post successfully in second attempt]
        notify('post was added successfully');
        this.props.history.push(Routes.DISCUSSION_DETAILS+id+'?');
      }).catch(error => {
        this.setState({addDiscussionServerError: true})
      })
    }
        this.setValidated(true);
    }

    changeHandler = (e: any) => {
      this.setState({[e.target.name]:e.target.value})
    }
    
    render() {
     return(
      <div className="container">
        {this.state.addDiscussionServerError && <Alert variant="danger">
          Sorry! unable to add post. Please try after sometime.
        </Alert>
        }
      <Form noValidate validated={this.state.validated} onSubmit={this.submitHandler}>
        <Form.Group controlId="discussionTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control pattern=".{5,}" required type="text" placeholder="Title" name="title" onChange={this.changeHandler}/>
          <Form.Control.Feedback type="invalid">Minimum 5 character is required</Form.Control.Feedback>
        </Form.Group>
  
    <Form.Group controlId="discussionDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control required as="textarea" rows="10" placeholder="Description" name="description" onChange={this.changeHandler} />
      <Form.Control.Feedback type="invalid">Description cannot be empty</Form.Control.Feedback>
    </Form.Group>
    <Button variant="primary" type="submit" className="mr-sm-2 float-right">
      Submit
    </Button>
    <LinkContainer to="/discussion">
    <Button variant="secondary" type="submit" className="mr-sm-2 float-right" value="">
      Cancel
    </Button>
        </LinkContainer>
  </Form>
  </div>
  )
    }
  }
  
  export default withRouter(AddDiscussionComponent)