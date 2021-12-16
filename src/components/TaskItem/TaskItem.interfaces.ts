import { Moment } from "moment";
import { TaskType } from "redux/mainReducer";

export interface TaskItemProps {
    task: TaskType
    chosenDate: Moment
    taskId: string
}