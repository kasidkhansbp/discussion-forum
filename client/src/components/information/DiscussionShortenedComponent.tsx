import React from 'react';
import { Redirect } from 'react-router-dom';
import { DiscussionComment } from '../../data/dataType';
import Routes from '../../data/routes';

interface Props {
    discussion: any;
    comments?: DiscussionComment[]
}

interface State {
    redirectToDiscussionDetails: boolean
}

class DiscussionShortenedComponent extends React.PureComponent<Props, State> {

    state: State = {
        redirectToDiscussionDetails: false
    };

    gotoDiscussionDetails = () => {
        this.setState({redirectToDiscussionDetails: true})
    }

    render() {

        const { redirectToDiscussionDetails } = this.state;

        if (redirectToDiscussionDetails) {
            return (
                <Redirect to={{
                    pathname: Routes.DISCUSSION_DETAILS+this.props.discussion.id,
                    state: {discussionId: this.props.discussion.id}}}/>
            );
        }

        return (
            <div onClick={this.gotoDiscussionDetails}>
                <div className="list-group-item clickable">
                    <h6 className="list-group-item-heading">{this.props.discussion.title}</h6>
                </div>
                {/* {this.props.comments && this.props.comments.map(comment => <CommentComponent userName={comment.userName} commentMessage={comment.message}/>)} */}
            </div>
        );
    }
}

export default DiscussionShortenedComponent;