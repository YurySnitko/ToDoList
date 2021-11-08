import React, { useEffect, useState } from 'react';
import s from './CalendarItem.module.css';
import cn from 'classnames';
import { Moment } from 'moment';
import { TaskType } from '../../../redux/mainReducer';

type PropsType = {
    tasks: {[key: string]: TaskType} | null
    date: Moment,
    today: boolean,
    active: boolean
    onCalendarItemChanged: (date: Moment) => void
}

export const CalendarItem = (props: PropsType) => {
    const [completedTasksExist, setCompletedTasksExists] = useState(false);
    const [incompletedTasksExist, setIncomletedTasksExists] = useState(false);

    useEffect(() => {
        if (props.tasks) {
            const dateTasks = Object.values(props.tasks);
            let hasDone = false;
            let hasUndone = false;
            dateTasks.map(e => { 
                if (e.isDone === false) {
                    setIncomletedTasksExists(true);
                    hasUndone = true;
                }
                if (e.isDone === true) {
                    setCompletedTasksExists(true);
                    hasDone = true;
                };
                return '';
            })
            if (!hasDone) setCompletedTasksExists(false);
            if (!hasUndone) setIncomletedTasksExists(false);
        }
    }, [props.tasks])

    return <div className={s.container}>
        <div onClick={() => props.onCalendarItemChanged(props.date)}
            className={cn({ [s.today]: props.today }, s.calendarItem, { [s.active]: props.active })}>
            <div>{props.date.format('ddd')}</div>
            <div>{props.date.date()}</div>
        </div>
        <div className={s.taskStatuses}>
            {completedTasksExist && <div className={s.completedTasksExist} />}
            {incompletedTasksExist && <div className={s.incompletedTasksExist} />}
        </div>
    </div>
}