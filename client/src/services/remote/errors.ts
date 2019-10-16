import { trigger } from "./handlers";
import { EventName } from "./Types";
import Route from "../../data/routes";
import { AxiosResponse } from "axios";

function handleHttpErrors(resp: AxiosResponse): boolean {
    let noErrors = false;
    if (resp.status >= 200 && resp.status < 300) {
        noErrors = true;
    } else if (resp.status === 401) {
        trigger(EventName.Unauthorised, Route.LOGIN);
    }
    return noErrors;
}

export {
    handleHttpErrors
}