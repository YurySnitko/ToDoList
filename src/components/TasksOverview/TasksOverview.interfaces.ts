import { Moment } from 'moment';

export interface TasksOverviewProps {
  chosenDate: Moment;
  onCalendarItemChanged: (date: Moment) => void;
}
