import { Moment } from 'moment';
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserId } from '../../../redux/authSelectors';
import { setTaskId, updateTask } from '../../../redux/mainReducer';
import { TaskType } from '../../../redux/mainReducer';
import s from './TaskItem.module.css';

export const TaskItem: React.FC<PropsType> = ({chosenDate, task, taskId}) => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);

    const handleClick = () => dispatch(setTaskId(taskId))

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask(userId, chosenDate, taskId, {...task, isDone: e.currentTarget.checked}))
    }

    return <div className={s.taskItem}>
        <label className={s.customCheckbox}>
            <input type="checkbox" onChange={handleChange} checked={task.isDone} />
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