import { Moment } from 'moment';
import React, { useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserId } from '../../../redux/authSelectors';
import { setTaskId, updateTask } from '../../../redux/mainReducer';
import { TaskType } from '../../../redux/mainReducer';
import s from './TaskItem.module.css';

export const TaskItem: React.FC<PropsType> = ({chosenDate, task, taskId}) => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    const checkbox = useRef<HTMLInputElement>(null);
    const {current} = checkbox;

    const handleClick = () => dispatch(setTaskId(taskId))

    useLayoutEffect(() => {
        const handleChange = () => {
            current && dispatch(updateTask(userId, chosenDate, taskId, {...task, isDone: current.checked}))
        }

        null !== current && (current.checked = task.isDone);
        
        current && (current.onchange = handleChange)
    }, [chosenDate, current, dispatch, task, taskId, userId])

    return <div className={s.taskItem}>
        <label className={s.customCheckbox}>
            <input type="checkbox" ref={checkbox} />
            <div></div>
        </label>
        <div className={s.taskLink} onClick={handleClick}>
            <NavLink to={'/task'}>{task.name}</NavLink>
        </div>
    </div>
}

type PropsType = {
    task: TaskType
    chosenDate: Moment
    taskId: string
}