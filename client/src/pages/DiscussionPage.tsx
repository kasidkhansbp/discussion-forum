import React from 'react';
import { AppData } from '../data/dataType';
import api from '../services/remote/api';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import PostListComponent from '../components/PostListComponent';

interface Props {
    discussions: any[] | undefined,
    dispatch: Dispatch,
    fetchDiscussions: Function,
    location: any
}


class DiscussionPage extends React.PureComponent<Props> {
    
    componentDidMount() {
        this.props.fetchDiscussions();
    }
    
    render() {
        return (
            <PostListComponent {...this.props}/>
        )
    }
}
const mapStateToProps = (state:AppData) => {
  // set flag to check if data is already loaded.
    return ({discussions: state.discussions})
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppData, any, any>) => ({
    fetchDiscussions: () => dispatch(api.getDiscussions())
})

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionPage)
