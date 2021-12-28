import { BaseThunkType, InferActionsTypes } from 'redux/reduxStore.interfaces';
import { actions, initialState } from './mainReducer';

export type InitialStateType = typeof initialState;
export type ActionsTypes = InferActionsTypes<typeof actions>;
export type ThunkType = BaseThunkType<ActionsTypes>;

export type TaskType = {
  name: string;
  text: string;
  isDone: boolean;
};

export type TasksDataType = { [key: string]: { [key: string]: TaskType } };
