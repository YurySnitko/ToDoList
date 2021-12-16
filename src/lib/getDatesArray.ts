import moment, { Moment } from "moment";

export const getDatesArray = (date: Moment) => {
    const start = date.date()
    const end = date.daysInMonth()
    const arr = [];
    for (let i = start; i <= end; i++) {
        const monthDate = moment(date.date(i))
        arr.push(monthDate)
    }
    return arr;
}