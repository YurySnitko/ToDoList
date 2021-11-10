import React from 'react';
import s from './MainPage.module.css';
import { Calendar } from './Calendar/Calendar';
import { Tasks } from './Tasks/Tasks';
import { Moment } from 'moment';

const MainPage: React.FC<PropsType> = ({chosenDate, onCalendarItemChanged}) => {
    return <div className={s.container}>
        <Calendar chosenDate={chosenDate} onCalendarItemChanged={onCalendarItemChanged} />
        <Tasks chosenDate={chosenDate} />
    </div>
}

export default MainPage

type PropsType = {
    chosenDate: Moment 
    onCalendarItemChanged: (date: Moment) => void
}