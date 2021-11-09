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
    const thisMonth = moment().format("MMMM YYYY");
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
    const startDateArray = getDatesArray(moment().date(), moment().daysInMonth());
    const [datesArray, setDatesArray] = useState(startDateArray);
    const [shownMonth, setShownMonth] = useState(moment().format("MMMM YYYY"));
    const [monthArray, setMonthArray] = useState([{month: thisMonth, start: 0, end: datesArray.length * 74}]);
    
    useEffect(() => {
        const calendarDiv = calendar.current;
        const handleScroll = () => {
            if (calendarDiv) {
                console.log(calendarDiv.scrollLeft)
                if (calendarDiv.scrollLeft + calendarDiv.clientWidth === calendarDiv.scrollWidth) {
                    const lastMonth = datesArray[datesArray.length - 1].month();
                    setDatesArray(datesArray.concat(
                        getDatesArray(1, moment().month(lastMonth + 1).daysInMonth(), lastMonth + 1))
                    )
                    const arr = monthArray
                        .concat([{month: moment().month(lastMonth + 1).format('MMMM YYYY'), 
                                  start: monthArray[monthArray.length - 1].end + 1, 
                                  end: monthArray[monthArray.length - 1].end + (moment().month(lastMonth + 1).daysInMonth() * 74)
                                }])
                    setMonthArray(arr);
                }
                const reduce = (r: string, e: any, i: number) => {
                    if (calendarDiv.scrollLeft >= e.start && calendarDiv.scrollLeft <= e.end) {
                        return r + e.month;
                    } else return r + '';
                }
                let res = monthArray.reduce(reduce, '');
                if (shownMonth !== res) setShownMonth(res);
            }
        }

        calendarDiv?.addEventListener('scroll', handleScroll)
        
        return () => calendarDiv?.removeEventListener('scroll', handleScroll)
    }, [datesArray, calendar, monthArray, shownMonth])

    return <div className={s.calendarContainer}>
        <div>
            {shownMonth}
        </div>
        <div ref={calendar} className={s.items}>
            {datesArray.map((d) => 
                <CalendarItem 
                    key={d.format("D-M-YY")}
                    date={d}
                    tasks={tasks[d.format("DD-MM-YYYY")]}
                    today={moment().format("D-M-YY") === d.format("D-M-YY")} 
                    active={d.format("D-M-YY") === props.chosenDate?.format("D-M-YY")}
                    onCalendarItemChanged={props.onCalendarItemChanged} />
            )}
        </div>
    </div>
}