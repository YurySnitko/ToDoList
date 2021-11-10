import React, { UIEventHandler, useState } from 'react';
import { CalendarItem } from './CalendarItem';
import s from './Calendar.module.css';
import moment, { Moment } from 'moment';
import { useSelector } from 'react-redux';
import { getTasks } from '../../../redux/mainSelectors';

export const Calendar: React.FC<PropsType> = ({chosenDate, onCalendarItemChanged}) => {
    const thisMonth = moment().format("MMMM YYYY");
    const startDatesArray = getDatesArray(moment().date(), moment().daysInMonth());
    const tasks = useSelector(getTasks);
    const [datesArray, setDatesArray] = useState<Moment[]>(startDatesArray);
    const [shownMonth, setShownMonth] = useState<string>(moment().format("MMMM YYYY"));
    const [monthArray, setMonthArray] = useState<MonthArrayDataType[]>
        ([{month: thisMonth, start: 0, end: datesArray.length * 74}]);
    const calendar = React.createRef<HTMLDivElement>();

    function getDatesArray(start: number, end: number, month: number = moment().month()) {
        const arr = [];
        for (let i = start; i <= end; i++) {
            const date = moment().month(month).date(i)
            arr.push(date)
        }
        return arr;
    }

    const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
        const calendarDiv = e.currentTarget;
            if (calendarDiv.scrollLeft + calendarDiv.clientWidth === calendarDiv.scrollWidth) {
                const lastMonth = datesArray[datesArray.length - 1].month();
                setDatesArray(datesArray.concat(
                    getDatesArray(1, moment().month(lastMonth + 1).daysInMonth(), lastMonth + 1))
                )

                setMonthArray([
                    ...monthArray,
                    {
                        month: moment().month(lastMonth + 1).format('MMMM YYYY'),
                        start: monthArray[monthArray.length - 1].end + 1,
                        end: monthArray[monthArray.length - 1].end + (moment().month(lastMonth + 1).daysInMonth() * 74)
                    }
                ]);
            }
            
            const res = monthArray.reduce((r: string, e: MonthArrayDataType) =>
                calendarDiv.scrollLeft >= e.start && calendarDiv.scrollLeft <= e.end ? r + e.month : r + '', ''
            );
                
            shownMonth !== res && setShownMonth(res);
        
    }

    return <div className={s.calendarContainer}>
        <div>
            {shownMonth}
        </div>
        <div ref={calendar} onScroll={handleScroll} className={s.items}>
            {datesArray.map((d) => 
                <CalendarItem 
                    key={d.format("D-M-YY")}
                    date={d}
                    tasks={tasks[d.format("DD-MM-YYYY")] || {}}
                    today={moment().format("D-M-YY") === d.format("D-M-YY")} 
                    active={d.format("D-M-YY") === chosenDate.format("D-M-YY")}
                    onCalendarItemChanged={onCalendarItemChanged} />
            )}
        </div>
    </div>
}

type PropsType = {
    chosenDate: Moment
    onCalendarItemChanged: (date: Moment) => void
}

type MonthArrayDataType = {
    month: string
    start: number
    end: number
}