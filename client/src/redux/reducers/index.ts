import { combineReducers } from "redux";
import { discussions, comments, loginStatus } from './dataReducers';

export default combineReducers({
    discussions,
    comments,
    loginStatus
});
