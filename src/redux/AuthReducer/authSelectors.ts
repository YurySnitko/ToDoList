import { AppStateType } from 'redux/ReduxStore/reduxStore.interfaces';

export const getIsAuth = (state: AppStateType): boolean => state.auth.isAuth;

export const getUserId = (state: AppStateType): string | null =>
  state.auth.userId;
