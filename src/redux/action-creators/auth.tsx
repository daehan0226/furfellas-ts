import axios, { AxiosError } from "axios";
import { UserActionType } from "../action-types";
import { Dispatch } from "redux";
import { UserAction } from "../actions";
import { MainApi } from "../../ApiService";
import { saveToken } from "../../utils";

export const authenticate =
    (user: { username: string, password: string }) => {
        return async (dispatch: Dispatch<UserAction>) => {
            dispatch({
                type: UserActionType.AUTHENTICATE_REQUEST
            });
            try {
                const api = MainApi.getInstance()
                const response = await api.addSession(user)
                dispatch({
                    type: UserActionType.AUTHENTICATE,
                    payload: response.data.result
                });
                saveToken(response.data.result.session)
            }
            catch (err: AxiosError | unknown) {
                let errMsg: string;
                if (axios.isAxiosError(err)) {
                    errMsg = err.response?.data.message
                } else {
                    errMsg = "Oops, something went wrong"
                }
                dispatch({
                    type: UserActionType.AUTHENTICATE_FAIL,
                    payload: errMsg,
                });
            }
        }
    }


export const reauthenticate = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: UserActionType.AUTHENTICATE_REQUEST
        });
        try {
            const api = MainApi.getInstance()
            const response = await api.validateSession()
            dispatch({
                type: UserActionType.AUTHENTICATE,
                payload: response.data.result
            });
        }
        catch (err: AxiosError | unknown) {
            dispatch({
                type: UserActionType.AUTHENTICATE_INIT
            });
        }
    }
}