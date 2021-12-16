import { DirectionType } from './../Calendar.interfaces';

export interface SkipBtnProps {
    onclick: ( direction: DirectionType) => void
    direction: DirectionType
}