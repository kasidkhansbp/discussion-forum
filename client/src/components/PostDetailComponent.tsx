import React from 'react';
import Button from 'react-bootstrap/Button';
import CommentComponent from './CommentComponent';
import Form from 'react-bootstrap/Form';
import api from '../services/remote/api';
import { AppData } from '../data/dataType';
import LoginComponent from './LoginComponent';
import { connect } from 'react-redux';
import { notify } from './NotificationComponent';
import Alert from 'react-bootstrap/Alert';

interface State {
  isInEditMode?:boolean,
  comment:any,
  addDiscussion:boolean,
  addDiscussionServerError: boolean,
  discussion:any
}

interface Props {
  discussion:any,
  loginStatus:any,
  refreshDiscussion:Function
}

const mapStateToProps = (state: AppData) => ({ loginStatus: state.loginStatus });

class PostDetailComponent extends React.PureComponent<Props,State> {

  // How to not override incoming state value?
  state:State = {
    isInEditMode:false,
    comment:'',
    addDiscussion:false,
    discussion: this.props.discussion,
    addDiscussionServerError: false
  }

  postEditSubmitHandler = (e:any)=> {
    e.preventDefault();
    api.updateDiscussion({id:this.state.discussion.id,title:this.state.discussion.title,description:this.state.discussion.description}).then(response =>{
      if(response.status===200) {
        this.props.refreshDiscussion();
        this.setState({addDiscussionServerError: false,isInEditMode: false}) 
      }
    }).catch(error=>{
      this.setState({addDiscussionServerError: true})
    })
  }

  commentSubmitHandler = (e:any) => {
    e.preventDefault();
    //call comment api ;
    api.addComment({comment:this.state.comment, id:this.state.discussion.id}).then(response => {
      if(response.status===200) {
        notify('comment was posted successfully')
        this.props.refreshDiscussion();
        this.setState({comment:''})
      } else {
        notify('unable to add comment')
      }
    }).catch(error => {
      notify('bad request')
    })
    
}

postChangeHandler = (e:any) => {
  //keep it in discussion state
  const {discussion} = this.state;
  const updateDiscussion = {...discussion};
  updateDiscussion[e.target.name] = e.target.value;
  this.setState({discussion: updateDiscussion, addDiscussion:true});
}

commentChangeHandler = (e:any) => {
  this.setState({comment:e.target.value});
}

editMode = (e:any) => {
  // code to change the editMode status
  this.setState({isInEditMode:true});
}

cancelEditMode = (e:any) => {
  // code to change the editMode status
  this.setState({isInEditMode:false});
}

renderDefaultPostView =()=> {
  return(
    <div>
      <div className="edit-button">
          {this.props.loginStatus.userId===this.props.discussion.createdBy.id && <div className="float-right clickable" onClick={this.editMode}>edit</div>
        }
      </div>
      <div className="discussion-title">{this.props.discussion && <h3>{this.props.discussion.title}</h3>}</div>
      <div><p className="posted-by">posted by - {this.props.discussion.createdBy.name}</p></div>
  <div>{this.props.discussion && <p className="discussion-description">{this.props.discussion.description}</p>}</div>
    </div>
  )
}

  renderEditPostView = () => {
      return(
        <div>
          <Form onSubmit={this.postEditSubmitHandler}>
            <Form.Group controlId="discussionTitle">
              <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={this.state.discussion.title} name="title" onChange={this.postChangeHandler} />
            </Form.Group>

            <Form.Group controlId="discussionDescription">
              <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="6" value={this.state.discussion.description} name="description" onChange={this.postChangeHandler} />
            </Form.Group>
            {/* submit should call api for post update. */}
            <Button variant="primary" type="submit" className="edit-Post_button" size="sm" onClick={this.postEditSubmitHandler} disabled={!this.state.addDiscussion}>
            Submit
           </Button>
           {/* submit should call api for post update. */}
           <Button variant="secondary" type="submit" className="edit-Post_button" size="sm" onClick={this.cancelEditMode}>
            cancel
           </Button>
          </Form>
        </div>
      )
  }

  commentSubmitForm = () => {
    return(
      <div>
          <Form onSubmit={this.commentSubmitHandler} className="container">
                        <Form.Group controlId="comment">
                            <Form.Label>comment</Form.Label>
                                <Form.Control as="textarea" rows="6" name="comment" value={this.state.comment} onChange={this.commentChangeHandler} />
                            </Form.Group>
                            <Button id="comment-button" variant="primary" type="submit" onSubmit={this.commentSubmitForm} disabled={!this.state.comment}>
                                Submit
                            </Button>
          </Form>
      </div>
    )
  }

  loginCommentForm = () => {
    return <div className="loginCommentForm">
      <div>
        <p>Any thoughts on this?  login to comment.</p>
      <LoginComponent />
      </div>
    </div>
  }

  render() {
    return (
  <div className="container">
    {this.state.addDiscussionServerError && <Alert variant="danger">
          Sorry! unable to add post. Please try after sometime.
        </Alert>
        }
    <div className="detailPost-container">
      <div className="post-container">
       {/* {either default view or edit view} */}
       {this.state.isInEditMode ? this.renderEditPostView():this.renderDefaultPostView()}
       {this.props.loginStatus.loginStatus ? this.commentSubmitForm():this.loginCommentForm()}
      </div>
        {this.props.discussion && <CommentComponent {...this.props} refreshDiscussion={this.props.refreshDiscussion}/>}
    </div>
  </div>
)}
  }

export default connect(mapStateToProps)(PostDetailComponent);
