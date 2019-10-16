import React from 'react';
import '../css/components.css';
import api from '../../services/remote/api';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { notify } from '../NotificationComponent';
import { AppData } from '../../data/dataType';

interface Props {
    comment: any;
    refreshDiscussion:Function,
    loginStatus:any
}

interface State {
  isEditMode:boolean,
  comment:any
}

const mapStateToProps = (state: AppData) => ({ loginStatus: state.loginStatus });

class CommentShortenedComponent extends React.PureComponent<Props,State> {

  state:State = {
    isEditMode:false,
    comment:this.props.comment
  }

  editMode = (e:any) => {
    this.setState({isEditMode:true});
  }

  cancelEditMode = (e:any) => {
    this.setState({isEditMode:false});
  }

  changeHandler = (e:any) => {
    const {comment} = this.props;
    const updateComment = {...comment};
    updateComment[e.target.name] = e.target.value;
    this.setState({comment:updateComment});
 }

 commentSubmit = (e:any) => {
  e.preventDefault();
  api.updateComment({comment:this.state.comment.description,id:this.state.comment.id}).then(response => {
    if(response.status===200) {
      this.setState({isEditMode:false})
      this.props.refreshDiscussion();
    } else {
      notify('something went wrong!')
    }
  })
 }

 defaultCommentView = () => {
  return(
    <div className="comment">
            <div className="edit-button clickable">
              {this.props.loginStatus.userId===this.props.comment.createdBy.id && <div className="float-right" onClick={this.editMode}>edit</div>}
            </div>
            <div className="delete-button clickable">
              {this.props.loginStatus.userId===this.props.comment.createdBy.id && <div className="float-right" onClick={()=>deleteComment(this.props)}>delete</div>}
            </div>
          <p>{this.props.comment.description}</p>
  </div>
  )
}

editCommentView = () => {
    return (
      <div className="comment">
    <Form>
      <Form.Group controlId="commentDescription">
          <Form.Control required as="textarea" rows="5" placeholder="" name="description" value={this.state.comment.description} onChange={this.changeHandler} />
          <Form.Control.Feedback type="invalid">Description cannot be empty</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit" className="mr-sm-2 float-right" onClick={this.commentSubmit}>
      Submit
      </Button>
        <Button variant="secondary" type="submit" className="mr-sm-2 float-right" value="" onClick={this.cancelEditMode}>
      Cancel
        </Button>
  </Form>
    </div>
    )
}

  render() {
    return(
      <div className="comment-container">
        <div className="comment-section">
          <div className="commented-by">{this.props.comment.createdBy.name}</div>
           <div> {this.state.isEditMode? this.editCommentView(): this.defaultCommentView()}</div>
        </div>
        </div>
    )
  }
}

const deleteComment = (props:Props) => {
  api.deleteComment({id:props.comment.id}).then(response=> {
    if(response.status===200) {
      props.refreshDiscussion();
    } else {
    }
  })
}
  
export default CommentShortenedComponent;