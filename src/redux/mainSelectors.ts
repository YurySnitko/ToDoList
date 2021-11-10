import { createSelector } from "reselect";
import { AppStateType } from "./reduxStore";

export const getDate = (state: AppStateType) => state.main.chosenDate;

export const getInitialized = (state: AppStateType) => state.main.initialized;

export const getTasks = (state: AppStateType) => state.main.tasks;

export const getTaskId = (state: AppStateType) => state.main.taskId;

export const getDateTasks = createSelector(getTasks, getDate, (tasks, date) => {
    return tasks[date.format('DD-MM-YYYY')];
})

export const getTaskData = createSelector(getDateTasks, getTaskId, (tasks, taskId) => {
    return tasks[taskId];
})
