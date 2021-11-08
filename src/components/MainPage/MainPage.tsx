import React from 'react';
import s from './MainPage.module.css';
import { Calendar } from './Calendar/Calendar';
import { Tasks } from './Tasks/Tasks';
import { Moment } from 'moment';

type PropsType = {
    chosenDate: Moment | null
    onCalendarItemChanged: (date: Moment) => void
}

const MainPage = (props: PropsType) => {
    return <div className={s.container}>
        <Calendar chosenDate={props.chosenDate} onCalendarItemChanged={props.onCalendarItemChanged} />
        <Tasks chosenDate={props.chosenDate} />
    </div>
}

export default MainPage