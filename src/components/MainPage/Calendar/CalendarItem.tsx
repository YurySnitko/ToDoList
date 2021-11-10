import React, { useEffect, useState } from 'react';
import s from './CalendarItem.module.css';
import cn from 'classnames';
import { Moment } from 'moment';
import { TaskType } from '../../../redux/mainReducer';

export const CalendarItem: React.FC<PropsType> = ({tasks, onCalendarItemChanged, date, today, active}) => {
    const [completedTasksExist, setCompletedTasksExists] = useState(false);
    const [incompletedTasksExist, setIncomletedTasksExists] = useState(false);

    const hasCompletedTask = (tasks: {[key: string]: TaskType}) => {
        return Object.values(tasks).filter(e => e.isDone).length > 0 ? true : false;  
    }

    const hasIncompletedTask = (tasks: {[key: string]: TaskType}) => {
        return Object.values(tasks).filter(e => !e.isDone).length > 0 ? true : false;  
    }

    useEffect(() => {
        if (Object.keys(tasks).length > 0) {
            setCompletedTasksExists(hasCompletedTask(tasks));
            setIncomletedTasksExists(hasIncompletedTask(tasks));
        }
    }, [tasks])

    return <div className={s.container}>
        <div onClick={() => onCalendarItemChanged(date)}
            className={cn({ [s.today]: today }, s.calendarItem, { [s.active]: active })}>
            <div>{date.format('ddd')}</div>
            <div>{date.date()}</div>
        </div>
        <div className={s.taskStatuses}>
            {completedTasksExist && <div className={s.completedTasksExist} />}
            {incompletedTasksExist && <div className={s.incompletedTasksExist} />}
        </div>
    </div>
}

type PropsType = {
    tasks: {[key: string]: TaskType}
    date: Moment
    today: boolean
    active: boolean
    onCalendarItemChanged: (date: Moment) => void
}