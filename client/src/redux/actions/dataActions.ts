import { ActionType } from "./actionType";

export function getDiscussionsAction(discussions: Array<any>) {
    return { type: ActionType.DISCUSSION, data: discussions };
}

export function getLoginStatus(loginStatus:any) {
    return { type: ActionType.LOGIN_STATUS, data: loginStatus};
}
