import { AppStateType } from "./reduxStore"

export const getIsAuth = (state: AppStateType) => state.auth.isAuth;

export const getUserId = (state: AppStateType) => state.auth.userId;