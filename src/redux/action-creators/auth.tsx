import axios, { AxiosError } from "axios";
import { UserActionType } from "../action-types";
import { Dispatch } from "redux";
import { UserAction } from "../actions";
import { MainApi } from "../../ApiService";

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
            }
            catch (err: AxiosError | unknown) {
                if (axios.isAxiosError(err)) {
                    console.log(err.response?.status)
                    dispatch({
                        type: UserActionType.AUTHENTICATE_FAIL,
                        payload: err.message,
                    });
                } else { // 나머지 에러를 처리한다.
                    console.log("Not AxiosError");
                    console.dir(err);
                }
            }
        }
    }


// export const reauthenticate =
//   (failCallback = () => { }) =>
//     (dispatch) => {
//       const cookies = new Cookies();
//       const session = cookies.get("EID_SES");
//       if (session) {
//         fetch(`${server}/api/sessions/validate`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: session,
//           },
//         })
//           .then((res) => {
//             if (res.status === 200) {
//               return res.json();
//             }
//           })
//           .then((response) => {
//             dispatch({ type: ActionType.USER_REAUTHENTICATE, payload: response.result });
//           })
//           .catch((err) => {
//             dispatch({ type: ActionType.USER_DEAUTHENTICATE });
//             failCallback();
//           });
//       } else {
//         dispatch({ type: ActionType.USER_DEAUTHENTICATE });
//         failCallback();
//       }
//     };

// export const deauthenticate = () => (dispatch) => {
//   const cookies = new Cookies();
//   const session = cookies.get("EID_SES");
//   cookies.remove("EID_SES", { path: "/" });
//   fetch(`${server}/api/sessions/`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: session,
//     },
//     method: "DELETE",
//   }).then((response) => {
//     dispatch({ type: ActionType.USER_DEAUTHENTICATE });
//   });
// };
