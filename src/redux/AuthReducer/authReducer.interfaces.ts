import { BaseThunkType, InferActionsTypes } from 'redux/reduxStore.interfaces';
import { actions, initialState } from './authReducer';

export type InitialStateType = typeof initialState;
export type ActionsTypes = InferActionsTypes<typeof actions>;
export type ThunkType = BaseThunkType<ActionsTypes>;
