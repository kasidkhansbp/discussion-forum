import React from 'react';
import { connect } from 'react-redux';
import { AppData } from '../data/dataType';
import PostDetailComponent from '../components/PostDetailComponent';
import api from '../services/remote/api';

interface Props {
    discussionId: string,
    discussion: any,
    location: any,
    fetchDiscussion:Function,
    pathname:any
}

interface State {
    discussion?:any
}


class DiscussionDetailsPage extends React.PureComponent<Props,State> {

    static getDerivedStateFromProps(nextProps: Props,previousState: State) {

        if(!!nextProps.discussion && !previousState.discussion) {
            return {discussion: nextProps.discussion}
        }
        return null;
    }

    state: State = {

    }

     getIdFromUrl = () => {
         var url = this.props.location.pathname;
         var splitUrl = url.split("/");
            return splitUrl[2].toString();
    }

    getDiscussion = ()=> {
        try {
            api.getDiscussion(this.getIdFromUrl()).then(response => {
                this.setState({discussion:response.data})
            })
        } catch(exception) {
        console.log('exception',exception)
        }
    }

    componentDidMount() {
            if(!this.state.discussion){
                this.getDiscussion();
            }
    }

    render() {
        console.log('inside render discussion detail page')
        return (
            <div>{this.state.discussion && <PostDetailComponent {...this.props}{...this.state} refreshDiscussion={this.getDiscussion}/>}</div>
        );
    }
}

function mapStateToProps(state: AppData, ownProps: Props) {
    if (state.discussions) {
        return {
            discussion: state.discussions && state.discussions.find(discussion => discussion.id === ownProps.location.state.discussionId)
        } 
    }
}

export default connect(mapStateToProps)(DiscussionDetailsPage)