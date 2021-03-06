import { UserActionType } from '../action-types';

interface SessionAuthAction {
    type: UserActionType.AUTHENTICATE,
    payload: any,
}

interface SessionDeAuthAction {
    type: UserActionType.DEAUTHENTICATE
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


interface SessionAuthInitAction {
    type: UserActionType.AUTHENTICATE_INIT
}
export type UserAction =
    | SessionAuthAction
    | SessionDeAuthAction
    | SessionReAuthAction
    | SessionAuthFailAction
    | SessionAuthRequestAction
    | SessionAuthInitAction;