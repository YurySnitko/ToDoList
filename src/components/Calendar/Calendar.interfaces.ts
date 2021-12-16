import { Moment } from "moment";

export interface CalendarProps {
    chosenDate: Moment
    onCalendarItemChanged: (date: Moment) => void
}

export interface MonthArrayData {
    month: string
    start: number
    end: number
}

export interface MonthChange {
    toogleBtn: boolean
    direction?: DirectionType
}

export type DirectionType = "right" | "left"