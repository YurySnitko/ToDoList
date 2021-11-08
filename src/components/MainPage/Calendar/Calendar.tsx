import React from 'react';
import { CalendarItem } from './CalendarItem';
import s from './Calendar.module.css';
import moment, { Moment } from 'moment';
import { useSelector } from 'react-redux';
import { getTasks } from '../../../redux/mainSelectors';

type PropsType = {
    chosenDate: Moment | null
    onCalendarItemChanged: (date: Moment) => void
}

export const Calendar = (props: PropsType) => {
    const today = moment();
    const tasks = useSelector(getTasks);
    //const restDaysInMonth = moment().daysInMonth() - today.date();
    const getDaysArray = (start: number, end: number) => {
        let a = [];
        for (let i = start; i <= end; i++) {
            let date = moment().date(i)
            a.push(date)
        }
        return a;
    }
    const currentMonthArray = getDaysArray(today.date(), moment().daysInMonth());
    
    return <div className={s.calendarContainer}>
        <div>
            {today.format("MMMM YYYY")}
        </div>
        <div className={s.items}>
            {currentMonthArray.map((d) => 
                <CalendarItem 
                    key={d.format("D-M-YY")}
                    date={d}
                    tasks={tasks[d.format("DD-MM-YYYY")]}
                    today={today.format("D-M-YY") === d.format("D-M-YY")} 
                    active={d.format("D-M-YY") === props.chosenDate?.format("D-M-YY")}
                    onCalendarItemChanged={props.onCalendarItemChanged} />
            )}
        </div>
    </div>
}