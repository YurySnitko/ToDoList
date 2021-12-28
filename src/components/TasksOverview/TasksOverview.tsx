import React from 'react';
import s from './TasksOverview.module.css';
import { Calendar } from '../Calendar/Calendar';
import { Tasks } from '../Tasks/Tasks';
import { TasksOverviewProps } from './TasksOverview.interfaces';

const TasksOverview: React.FC<TasksOverviewProps> = ({
  chosenDate,
  onCalendarItemChanged,
}) => {
  return (
    <div className={s.container}>
      <Calendar
        chosenDate={chosenDate}
        onCalendarItemChanged={onCalendarItemChanged}
      />
      <Tasks chosenDate={chosenDate} />
    </div>
  );
};

export default TasksOverview;
