import { createSelector } from "reselect";
import { AppStateType } from "./reduxStore";

export const getDate = (state: AppStateType) => {
    return state.main.chosenDate;
}

export const getInitialized = (state: AppStateType) => {
    return state.main.initialized;
}

export const getTasks = (state: AppStateType) => {
    return state.main.tasks;
}

export const getTaskId = (state: AppStateType) => {
    return state.main.taskId;
}

export const getDateTasks = createSelector(getTasks, getDate, (tasks, date) => {
    return tasks[date?.format('DD-MM-YYYY')];
    //const filteredTasks = tasks.filter(t => t[0] === date?.format('DD-MM-YYYY'))[0];
    //return filteredTasks ? filteredTasks[1] : null; 
})

export const getTaskData = createSelector(getDateTasks, getTaskId, (tasks, taskId: string) => {
    //const filteredTasks = tasks.filter((t: [string, object]) => t[0] === taskId)[0];
    return  tasks[taskId];
})

// export const getDateTasks = createSelector(getTasks, getDate, (tasks, date) => {
//     const filteredTasks = tasks.filter(t => t[0] === date?.format('DD-MM-YYYY'))[0];
//     return filteredTasks ? filteredTasks[1] : null; 
// })

// export const getTaskData = createSelector(getDateTasks, getTaskId, (tasks, taskId) => {
//     const filteredTasks = tasks.filter((t: [string, object]) => t[0] === taskId)[0];
//     return filteredTasks ? filteredTasks[1] : null; 
// })
