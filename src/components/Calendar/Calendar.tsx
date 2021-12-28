import React, { UIEventHandler, useEffect, useRef, useState } from 'react';
import s from './Calendar.module.css';
import moment, { Moment } from 'moment';
import { useSelector } from 'react-redux';
import {
  CalendarProps,
  DirectionType,
  MonthArrayData,
  MonthChange,
} from './Calendar.interfaces';
import { CalendarItem } from '../CalendarItem/CalendarItem';
import { getDatesArray } from 'lib/getDatesArray';
import { useIsMount } from 'lib/useIsMount';
import { SkipBtn } from 'controls/SkipBtn/SkipBtn';
import { getTasks } from 'redux/MainReducer/mainSelectors';

export const Calendar: React.FC<CalendarProps> = ({
  chosenDate,
  onCalendarItemChanged,
}) => {
  const thisMonth = moment().format('MMMM YYYY');
  const tasks = useSelector(getTasks);
  const isMount = useIsMount();
  const monthChange = useRef<MonthChange>({ toogleBtn: false });
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const [datesArray, setDatesArray] = useState<Moment[]>(() =>
    getDatesArray(moment())
  );
  const [shownMonth, setShownMonth] = useState<number>(0);
  const [monthArray, setMonthArray] = useState<MonthArrayData[]>([
    { month: thisMonth, start: 0, end: datesArray.length * 74 },
  ]);

  const addDates = () => {
    const lastDate = datesArray[datesArray.length - 1];
    const nextMonth = moment(lastDate).date(lastDate.date() + 1);
    setDatesArray((prevDatesArray) => {
      const lastDate = prevDatesArray[prevDatesArray.length - 1];
      const nextMonth = moment(lastDate).date(lastDate.date() + 1);
      return prevDatesArray.concat(getDatesArray(nextMonth));
    });

    setMonthArray((prevMonthArray) => [
      ...prevMonthArray,
      {
        month: nextMonth.format('MMMM YYYY'),
        start: prevMonthArray[prevMonthArray.length - 1].end + 1,
        end:
          prevMonthArray[prevMonthArray.length - 1].end +
          nextMonth.daysInMonth() * 74,
      },
    ]);
  };

  const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
    const calendarDiv = e.currentTarget;
    if (
      calendarDiv.scrollLeft + calendarDiv.clientWidth ===
      calendarDiv.scrollWidth
    ) {
      addDates();
    }

    const res = monthArray.findIndex(
      (e: MonthArrayData) =>
        calendarDiv.scrollLeft >= e.start && calendarDiv.scrollLeft <= e.end
    );

    shownMonth !== res && setShownMonth(res);
  };

  const handleClick = (direction: DirectionType) => {
    switch (direction) {
      case 'right':
        setShownMonth((prev) => prev + 1);
        monthChange.current = {
          toogleBtn: !monthChange.current.toogleBtn,
          direction: direction,
        };
        if (calendarRef.current) {
          calendarRef.current.scrollWidth < monthArray[shownMonth].end + 50 &&
            addDates();
        }
        break;
      case 'left':
        setShownMonth((prev) => prev - 1);
        monthChange.current = {
          toogleBtn: !monthChange.current.toogleBtn,
          direction: direction,
        };
        break;
    }
  };

  useEffect(() => {
    if (calendarRef.current && !isMount) {
      monthChange.current.direction === 'right'
        ? (calendarRef.current.scrollLeft = monthArray[shownMonth - 1].end + 20)
        : (calendarRef.current.scrollLeft = monthArray[shownMonth].start + 20);
    }
  }, [monthChange.current]);

  return (
    <div className={s.calendarContainer}>
      <div className={s.month}>
        {shownMonth > 0 && <SkipBtn direction="left" onclick={handleClick} />}
        {monthArray[shownMonth].month}
        <SkipBtn direction="right" onclick={handleClick} />
      </div>
      <div className={s.items} ref={calendarRef} onScroll={handleScroll}>
        {datesArray.map((d) => (
          <CalendarItem
            key={d.format('D-M-YY')}
            date={d}
            tasks={tasks[d.format('DD-MM-YYYY')] || {}}
            today={moment().format('D-M-YY') === d.format('D-M-YY')}
            active={d.format('D-M-YY') === chosenDate.format('D-M-YY')}
            onCalendarItemChanged={onCalendarItemChanged}
          />
        ))}
      </div>
    </div>
  );
};
