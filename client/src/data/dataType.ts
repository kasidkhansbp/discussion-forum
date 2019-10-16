import { ActionType } from "../redux/actions/actionType";

export interface AppData {
    discussions?: any[],
    loginStatus: any
}

export interface ReduxAction {
    type: ActionType,
    data: any
}

export interface DiscussionComment {
    userName: string;
    message: string;
}

export interface LoginStatus {
  loginStatus: any;
}
