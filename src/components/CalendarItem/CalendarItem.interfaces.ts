import { Moment } from 'moment';
import { TaskType } from 'redux/MainReducer/mainReducer.interfaces';

export interface CalentarItemProps {
  tasks: { [key: string]: TaskType };
  date: Moment;
  today: boolean;
  active: boolean;
  onCalendarItemChanged: (date: Moment) => void;
}
