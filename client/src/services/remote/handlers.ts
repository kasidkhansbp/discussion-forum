import { Dispatch } from "redux";
import { handleHttpErrors } from "./errors";
import { AxiosResponse, AxiosError } from "axios";

const eventHandlers: any = {};
function on(eventName: string, eventHandler: Function) {
    if (!eventHandlers[eventName]) {
        eventHandlers[eventName] = [];
    }
    eventHandlers[eventName].push(eventHandler);
    return function off() {
        const pos = eventHandlers[eventName].indexOf(eventHandler);
        if (pos !== -1) {
            eventHandlers[eventName].splice(pos, 1);
        }
    };
}

function trigger(eventName: string, ...args: any[]) {
    if (!!eventHandlers[eventName].length) {
        eventHandlers[eventName].forEach((eventHandler: Function) => eventHandler.apply(null, args));
    }
}

function handleResponse(resp: Promise<AxiosResponse>, dispatch: Dispatch, action: Function) {
    resp.then((resp) => { 
        dispatch(action(resp.data));
        
    }).catch((err: AxiosError) => {
        if (err.response) {            
            handleHttpErrors(err.response);
        }
    });
}

export {
    on,
    trigger,
    handleResponse
}