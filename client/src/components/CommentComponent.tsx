import React from 'react';
import CommentShortenedComponent from '../components/information/CommentShortenedComponent';

interface Props {
  discussion:any,
  refreshDiscussion:Function,
  loginStatus:any,
}
class CommentComponent extends React.PureComponent<any> {
    render() {
      return (
        <div className="container comment-container">
           {this.props.discussion.comments && this.props.discussion.comments.map((comment:any) => <CommentShortenedComponent key={comment.id} comment={comment} refreshDiscussion={this.props.refreshDiscussion} loginStatus={this.props.loginStatus}/>)}
        </div>
      );
};
};

export default CommentComponent;
