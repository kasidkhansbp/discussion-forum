import { ReduxAction } from "../../data/dataType";
import { ActionType } from "../actions/actionType";

function discussions(state = [], action: ReduxAction) {
    switch (action.type) {
        case ActionType.DISCUSSION:
            return action.data || [];
        default:
            return state;
    }
}

function comments(state = [], action: ReduxAction) {
    switch (action.type) {
        case ActionType.COMMENTS:
            return action.data || [];
        default:
            return state;
    }
}

function loginStatus(state = false, action: ReduxAction) {    
    switch (action.type) {
        case ActionType.LOGIN_STATUS:            
            return action.data;
        default:
            return state;
    }
}

export {
    discussions,
    comments,
    loginStatus
};
