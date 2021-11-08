
import { mainAPI } from '../api/mainApi';
import moment, { Moment } from "moment";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

type TaskDataType = {
    date: string
    taskId: string ,
    task: TaskType
}

export type TaskType = {
    name: string
    text: string
    isDone: boolean
}

const initialState = {
    chosenDate: moment() as Moment,
    tasks: {} as {[key: string]: {[key: string]: TaskType}},
    taskId: '' as string,
    initialized: false as boolean
}

const mainReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'MAIN/SET_CHOSEN_DATE':
        case 'MAIN/SET_TASKID':
        case 'MAIN/INITIALIZED_SUCCESS':
        case 'MAIN/SET_TASKS':
            return {
                ...state,
                ...action.payload
            }
        case 'MAIN/ADD_TASK':
            return {
                ...state,
                tasks: {
                    ...state.tasks, 
                    [action.payload.date]: {
                        ...state.tasks[action.payload.date], 
                        [action.payload.taskId]: action.payload.task}
                    }
            }
        case 'MAIN/UPDATE_TASK':
            return {
                ...state,
                tasks: {
                    ...state.tasks, 
                    [action.payload.date]: {
                        ...state.tasks[action.payload.date], 
                        [action.payload.taskId]: {...action.payload.task}
                    }
                }
            }
        default:
            return state;
    }
}

export const actions = {
    setChosenDate: (chosenDate: Moment) => ({type: 'MAIN/SET_CHOSEN_DATE', payload: { chosenDate } } as const),
    setTasks: (tasks: any) => ({type: 'MAIN/SET_TASKS', payload: { tasks } } as const),
    setTask: (newTaskData: TaskDataType) => ({type: 'MAIN/ADD_TASK', payload: { ...newTaskData } } as const),
    updateTask: (newTaskData: TaskDataType) => ({type: 'MAIN/UPDATE_TASK', payload: { ...newTaskData } } as const),
    setTaskId: (taskId: string) => ({type: 'MAIN/SET_TASKID', payload: { taskId } } as const),
    initializedSuccess: (initialized: boolean) => ({type: 'MAIN/INITIALIZED_SUCCESS', payload: { initialized } } as const),
}

export const getChosenDate = (date: Moment): ThunkType => async (dispatch) => {
    dispatch(actions.setChosenDate(date));
}

export const setTaskId = (taskId: string): ThunkType => async (dispatch) => {
    dispatch(actions.setTaskId(taskId));
}

export const getTasks = (userId: string | null): ThunkType => async (dispatch) => {
    const tasksData = await mainAPI.getTasks(userId);
    dispatch(actions.setTasks(tasksData));
}

export const addTask = (userId: string | null, date: Moment, taskData: TaskType): ThunkType => async (dispatch) => {
    const taskKey = mainAPI.createTaskKey(userId, date.format('DD-MM-YYYY'));
    await mainAPI.setTask(userId, date.format('DD-MM-YYYY'), taskKey, taskData)
    if (taskKey) {
        const newTaskData: TaskDataType = {
            date: date.format('DD-MM-YYYY'),
            taskId: taskKey,
            task: taskData
        }
        dispatch(actions.setTask(newTaskData));
    }
    
}

export const updateTask = (userId: string | null, date: Moment , taskId: string, taskData: TaskType): ThunkType => async (dispatch) => {
    await mainAPI.updateTask(userId, date.format('DD-MM-YYYY'), taskId, taskData)
    const newTaskData: TaskDataType = {
        date: date.format('DD-MM-YYYY'),
        taskId: taskId,
        task: taskData
    }
    dispatch(actions.updateTask(newTaskData));
}

export const initializeApp = (userId: string | null): ThunkType => async (dispatch) => {
    await dispatch(getTasks(userId));
    dispatch(actions.initializedSuccess(true));
}






// export const signUp = (email: string, password: string): ThunkType => async (dispatch) => {
//     await authAPI.signUp(email, password);
//     dispatch(login(email, password));
// }

// export const logout = (): ThunkType => async (dispatch) => {
//     await authAPI.logout();
//     dispatch(actions.setAuthUserData(null, false));
// }

export default mainReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>