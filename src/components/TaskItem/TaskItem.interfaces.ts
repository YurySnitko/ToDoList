import { Moment } from 'moment';
import { TaskType } from 'redux/MainReducer/mainReducer.interfaces';

export interface TaskItemProps {
  task: TaskType;
  chosenDate: Moment;
  taskId: string;
}
