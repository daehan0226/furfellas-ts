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
            console.log(action.payload)
            return { loading: false, error: null, loggedIn: true, data: action.payload };
        case UserActionType.DEAUTHENTICATE:
            return { loading: false, error: null, loggedIn: false, data: null };
        case UserActionType.AUTHENTICATE_INIT:
            return { ...initialState };
        default:
            return state;
    }
};

export default reducer;