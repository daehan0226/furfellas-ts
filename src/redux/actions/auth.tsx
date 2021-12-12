import { UserActionType } from '../action-types';

interface SessionAuthAction {
    type: UserActionType.AUTHENTICATE,
    payload: any,
}

interface SessionDeAuthAction {
    type: UserActionType.DEAUTHENTICATE,
    payload: any,
}

interface SessionReAuthAction {
    type: UserActionType.REAUTHENTICATE,
    payload: any,
}


interface SessionAuthFailAction {
    type: UserActionType.AUTHENTICATE_FAIL,
    payload: any,
}


interface SessionAuthRequestAction {
    type: UserActionType.AUTHENTICATE_REQUEST
}


export type UserAction =
    | SessionAuthAction
    | SessionDeAuthAction
    | SessionReAuthAction
    | SessionAuthFailAction
    | SessionAuthRequestAction;