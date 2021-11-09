import React, { useEffect, useState } from 'react';
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
    const calendar = React.createRef<HTMLDivElement>();
    const getDatesArray = (start: number, end: number, month: number = moment().month()) => {
        let a = [];
        for (let i = start; i <= end; i++) {
            let date = moment().month(month).date(i)
            a.push(date)
        }
        return a;
    }
    const startDateArray = getDatesArray(today.date(), moment().daysInMonth());
    const [datesArray, setDatesArray] = useState(startDateArray);
    //const [shownMonth, setShownMonth] = useState(moment().format("MMMM YYYY"))
    
    useEffect(() => {
        const calendarDiv = calendar.current;
        const handleScroll = () => {
            if (calendarDiv) {
                if (calendarDiv.scrollLeft + calendarDiv.clientWidth === calendarDiv.scrollWidth) {
                    const lastMonth = datesArray[datesArray.length - 1].month();
                    setDatesArray(datesArray.concat(
                        getDatesArray(1, moment().month(lastMonth + 1).daysInMonth(), lastMonth + 1))
                    )
                }
                // console.log('arraylength:',  Math.round(startDateArray.length * 81.6))
                // console.log('scroll:',  calendarDiv.scrollLeft)
                // if (Math.round(startDateArray.length * 81.6) < calendarDiv.scrollLeft) {
                //     setShownMonth(datesArray[datesArray.length - 1].format("MMMM YYYY"));

                // }
            }
        }

        calendarDiv?.addEventListener('scroll', handleScroll)
        
        return () => calendarDiv?.removeEventListener('scroll', handleScroll)
    }, [datesArray, calendar])

    return <div className={s.calendarContainer}>
        <div>
            {today.format("MMMM YYYY")}
            {/* {shownMonth} */}
        </div>
        <div ref={calendar} className={s.items}>
            {datesArray.map((d) => 
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