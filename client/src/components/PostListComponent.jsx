import React from 'react';
import DiscussionShortenedComponent from '../components/information/DiscussionShortenedComponent';
class PostListComponent extends React.PureComponent {
    render() {
      return (
        <div className="container">
           {this.props.discussions && this.props.discussions.map(discussion => <DiscussionShortenedComponent key={discussion.id} discussion={discussion} comments={discussion.comments}/>)}
        </div>
      );
};
};

export default PostListComponent
