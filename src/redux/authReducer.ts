import { authAPI } from "../api/authApi";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

const initialState = {
    userId: null as string | null,
    isAuth: false
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: string | null, isAuth: boolean) => (
        {type: 'AUTH/SET_USER_DATA', payload: { userId, isAuth } } as const),
}

export const login = (email: string, password: string): ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password);
    loginData && dispatch(actions.setAuthUserData(loginData.uid, true))
}

export const signUp = (email: string, password: string): ThunkType => async (dispatch) => {
    await authAPI.signUp(email, password);
    dispatch(login(email, password));
}

export const logout = (): ThunkType => async (dispatch) => {
    await authAPI.logout();
    dispatch(actions.setAuthUserData(null, false));
}

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>