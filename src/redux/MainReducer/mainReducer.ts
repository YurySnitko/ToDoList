import { mainAPI } from 'api/mainApi';
import moment, { Moment } from 'moment';
import {
  ActionsTypes,
  InitialStateType,
  TasksDataType,
  TaskType,
  ThunkType,
} from './mainReducer.interfaces';

export const initialState = {
  chosenDate: moment() as Moment,
  tasks: {} as TasksDataType,
  taskId: '' as string,
  initialized: false as boolean,
};

const mainReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'MAIN/SET_CHOSEN_DATE':
    case 'MAIN/SET_TASKID':
    case 'MAIN/INITIALIZED_SUCCESS':
    case 'MAIN/SET_TASKS':
      return {
        ...state,
        ...action.payload,
      };
    case 'MAIN/ADD_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.date]: {
            ...state.tasks[action.payload.date],
            [action.payload.taskId]: action.payload.task,
          },
        },
      };
    case 'MAIN/UPDATE_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.date]: {
            ...state.tasks[action.payload.date],
            [action.payload.taskId]: { ...action.payload.task },
          },
        },
      };
    default:
      return state;
  }
};

export const actions = {
  setChosenDate: (chosenDate: Moment) =>
    ({ type: 'MAIN/SET_CHOSEN_DATE', payload: { chosenDate } } as const),
  setTasks: (tasks: TasksDataType) =>
    ({ type: 'MAIN/SET_TASKS', payload: { tasks } } as const),
  addTask: (date: string, taskId: string, task: TaskType) =>
    ({ type: 'MAIN/ADD_TASK', payload: { date, taskId, task } } as const),
  updateTask: (date: string, taskId: string, task: TaskType) =>
    ({ type: 'MAIN/UPDATE_TASK', payload: { date, taskId, task } } as const),
  setTaskId: (taskId: string) =>
    ({ type: 'MAIN/SET_TASKID', payload: { taskId } } as const),
  initializedSuccess: (initialized: boolean) =>
    ({ type: 'MAIN/INITIALIZED_SUCCESS', payload: { initialized } } as const),
};

export const getChosenDate =
  (date: Moment): ThunkType =>
  async (dispatch) => {
    dispatch(actions.setChosenDate(date));
  };

export const setTaskId =
  (taskId: string): ThunkType =>
  async (dispatch) => {
    dispatch(actions.setTaskId(taskId));
  };

export const getTasks =
  (userId: string | null): ThunkType =>
  async (dispatch) => {
    const tasksData = await mainAPI.getTasks(userId);
    dispatch(actions.setTasks(tasksData));
  };

export const addTask =
  (userId: string | null, date: Moment, taskData: TaskType): ThunkType =>
  async (dispatch) => {
    const taskId = mainAPI.createTaskKey(userId, date.format('DD-MM-YYYY'));
    await mainAPI.setTask(userId, date.format('DD-MM-YYYY'), taskId, taskData);
    taskId &&
      dispatch(actions.addTask(date.format('DD-MM-YYYY'), taskId, taskData));
  };

export const updateTask =
  (
    userId: string | null,
    date: Moment,
    taskId: string,
    taskData: TaskType
  ): ThunkType =>
  async (dispatch) => {
    await mainAPI.updateTask(
      userId,
      date.format('DD-MM-YYYY'),
      taskId,
      taskData
    );
    dispatch(actions.updateTask(date.format('DD-MM-YYYY'), taskId, taskData));
  };

export const initializeApp =
  (userId: string | null): ThunkType =>
  async (dispatch) => {
    await dispatch(getTasks(userId));
    dispatch(actions.initializedSuccess(true));
  };

export default mainReducer;
