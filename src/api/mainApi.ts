import { database } from './firebase';
import { child, get, push, ref, set } from '@firebase/database';
import { getToast } from '../lib/toast';
import {
  TasksDataType,
  TaskType,
} from 'redux/MainReducer/mainReducer.interfaces';

export const mainAPI = {
  createTaskKey(userId: string | null, date: string): string | null {
    return push(child(ref(database), `users/${userId}/tasks/${date}`)).key;
  },
  setTask(
    userId: string | null,
    date: string,
    key: string | null,
    taskData: TaskType
  ): Promise<void> {
    return set(ref(database, `users/${userId}/tasks/${date}/${key}`), taskData);
  },
  getTasks(userId: string | null): Promise<TasksDataType> {
    return get(child(ref(database), `users/${userId}/tasks/`))
      .then((snapshot) => snapshot.exists() && snapshot.val())
      .catch((err) => err && getToast(err));
  },
  updateTask(
    userId: string | null,
    date: string,
    taskId: string | null,
    taskData: TaskType
  ): Promise<void> {
    return set(
      ref(database, `users/${userId}/tasks/${date}/${taskId}`),
      taskData
    );
  },
};
