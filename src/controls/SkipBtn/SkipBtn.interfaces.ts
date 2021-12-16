import { DirectionType } from 'components/Calendar/Calendar.interfaces';

export interface SkipBtnProps {
    onclick: ( direction: DirectionType) => void
    direction: DirectionType
}