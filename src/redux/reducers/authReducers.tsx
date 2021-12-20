import { UserAction } from '../actions';
import { UserActionType } from '../action-types';


interface IAuth {
    user: string,
    is_admin: number,
    session: string
}

interface UserState {
    loading: boolean,
    error: string | null,
    data: IAuth | null,
    loggedIn: boolean,
}

const initialState = {
    loading: false,
    loggedIn: false,
    error: null,
    data: null
}

const reducer = (
    state: UserState = initialState,
    action: UserAction
): UserState => {
    switch (action.type) {
        case UserActionType.AUTHENTICATE_REQUEST:
            return { ...state, loading: true }
        case UserActionType.AUTHENTICATE:
        case UserActionType.REAUTHENTICATE:
            return { loading: false, error: null, loggedIn: true, data: action.payload };
        case UserActionType.DEAUTHENTICATE:
        case UserActionType.AUTHENTICATE_INIT:
            return { ...initialState };
        case UserActionType.AUTHENTICATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default reducer;