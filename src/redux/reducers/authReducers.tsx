import { UserAction } from '../actions';
import { UserActionType } from '../action-types';

interface UserState {
    loading: boolean,
    error: string | null,
    data: object,
}

const initialState = {
    loading: false,
    error: null,
    data: {},
}

const reducer = (
    state: UserState = initialState,
    action: UserAction
): UserState => {
    switch (action.type) {
        case UserActionType.AUTHENTICATE_REQUEST:
            return { ...state, loading: true }
        case UserActionType.AUTHENTICATE:
            console.log(action.payload)
            return { loading: false, error: null, data: action.payload };
        case UserActionType.DEAUTHENTICATE:
            return { loading: false, error: null, data: {} };
        case UserActionType.REAUTHENTICATE:
            return { loading: false, error: null, data: {} };
        default:
            return state;
    }
};

export default reducer;