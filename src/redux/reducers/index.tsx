import { combineReducers } from "redux";
import authReducers from "./authReducers";

const reducers = combineReducers({
    auth: authReducers,
})

export type RootState = ReturnType<typeof reducers>;

export default reducers;