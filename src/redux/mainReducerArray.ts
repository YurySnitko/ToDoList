
import { mainAPI } from '../api/mainApi';
import moment, { Moment } from "moment";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

type TaskDataType = {
    date: string
    taskId: string | null,
    task: object
}

const initialState = {
    chosenDate: moment() as Moment,
    tasks: [] as Array<Array<any>>,
    taskId: null as string | null
}

const mainReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'MAIN/SET_CHOSEN_DATE':
        case 'MAIN/SET_TASKID':
        case 'MAIN/SET_TASKS':
            return {
                ...state,
                ...action.payload
            }
        case 'MAIN/SET_TASK':
            if (state.tasks.filter(e => e[0] === action.payload.date).length > 0) {
                return {
                    ...state,
                    tasks: [...state.tasks.map((e) => {
                        if (e[0] === action.payload.date) {
                            return [e[0], [...e[1], [action.payload.taskId, action.payload.task]]]
                        } else return e;
                    })]
                }
            } else return {
                ...state,
                tasks: [ ...state.tasks, [action.payload.date, [[action.payload.taskId, action.payload.task]]]]
            }
        case 'MAIN/UPDATE_TASK':
            return {
                ...state,
                tasks: [...state.tasks.map((e) => {
                    if (e[0] === action.payload.date) {
                        return [e[0], [...e[1].map((t: [string, object]) => {
                            if (t[0] === action.payload.taskId) return [action.payload.taskId, {...action.payload.task}];
                            else return t;
                        })]] 
                    } else return e;
                })]
            }
        default:
            return state;
    }
}

export const actions = {
    setChosenDate: (chosenDate: Moment) => ({type: 'MAIN/SET_CHOSEN_DATE', payload: { chosenDate } } as const),
    setTasks: (tasks: any) => ({type: 'MAIN/SET_TASKS', payload: { tasks } } as const),
    setTask: (newTaskData: TaskDataType) => ({type: 'MAIN/SET_TASK', payload: { ...newTaskData } } as const),
    updateTask: (newTaskData: TaskDataType) => ({type: 'MAIN/UPDATE_TASK', payload: { ...newTaskData } } as const),
    setTaskId: (taskId: string) => ({type: 'MAIN/SET_TASKID', payload: { taskId } } as const),
}

export const getChosenDate = (date: Moment): ThunkType => async (dispatch) => {
    dispatch(actions.setChosenDate(date));
}

export const setTaskId = (taskId: string): ThunkType => async (dispatch) => {
    dispatch(actions.setTaskId(taskId));
}

export const getTasks = (userId: string | null): ThunkType => async (dispatch) => {
    const tasksData: object = await mainAPI.getTasks(userId);
    console.log(tasksData)
    //const changedData = Object.entries(tasksData).map(e => {return [e[0], Object.entries(e[1])]});
    dispatch(actions.setTasks(tasksData));
}

export const addTask = (userId: string | null, date: Moment, taskData: any): ThunkType => async (dispatch) => {
    const taskKey = mainAPI.createTaskKey(userId, date.format('DD-MM-YYYY'));
    await mainAPI.setTask(userId, date.format('DD-MM-YYYY'), taskKey, taskData)
    const newTaskData: TaskDataType = {
        date: date.format('DD-MM-YYYY'),
        taskId: taskKey,
        task: taskData
    }
    dispatch(actions.setTask(newTaskData));
}

export const updateTask = (userId: string | null, date: Moment , taskId: string | null, taskData: any): ThunkType => async (dispatch) => {
    await mainAPI.updateTask(userId, date.format('DD-MM-YYYY'), taskId, taskData)
    const newTaskData: TaskDataType = {
        date: date.format('DD-MM-YYYY'),
        taskId: taskId,
        task: taskData
    }
    dispatch(actions.updateTask(newTaskData));
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