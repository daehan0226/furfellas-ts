import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import { authenticate } from "./auth";

// const searchRepositories = (term: string) => {
//     return async (dispatch: Dispatch<Action>) => {
//         dispatch({ // 검색 시 (onSubmit에서 처리) 액션
//             type: ActionType.SEARCH_REPOSITORIES,
//         });

//         try {
//             const { data } = await axios.get(
//                 "https://registry.npmjs.org/-/v1/search",
//                 {
//                     params: {
//                         text: term,
//                     },
//                 }
//             );

//             const names = data.objects.map((results: any) => results.package.name);
//             dispatch({ // 성공 시 액션
//                 type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
//                 payload: names,
//             });
//         } catch (err: AxiosError | unknown) { // error 타입을 정의한다. 기본적으로 unknown은 추가해야 ts에러가 발생하지 않는다.
//             if (axios.isAxiosError(err)) { // type-guard로 axios관련 Error만 처리한다.
//                 dispatch({ // 실패 시 액션
//                     type: ActionType.SEARCH_REPOSITORIES_ERROR,
//                     payload: err.message,
//                 });
//             } else { // 나머지 에러를 처리한다.
//                 console.log("Not AxiosError");
//                 console.dir(err);
//             }
//         }
//     };
// };


export {
    authenticate
}