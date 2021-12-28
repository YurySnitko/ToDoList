import { Moment } from 'moment';
import { AppStateType } from 'redux/ReduxStore/reduxStore.interfaces';
import { createSelector } from 'reselect';
import { TasksDataType } from './mainReducer.interfaces';

export const getDate = (state: AppStateType): Moment => state.main.chosenDate;

export const getInitialized = (state: AppStateType): boolean =>
  state.main.initialized;

export const getTasks = (state: AppStateType): TasksDataType =>
  state.main.tasks;

export const getTaskId = (state: AppStateType): string => state.main.taskId;

export const getDateTasks = createSelector(getTasks, getDate, (tasks, date) => {
  return tasks[date.format('DD-MM-YYYY')];
});

export const getTaskData = createSelector(
  getDateTasks,
  getTaskId,
  (tasks, taskId) => {
    return tasks[taskId];
  }
);
