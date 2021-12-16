import { CheckBox } from 'controls/CheckBox/CheckBox';
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserId } from 'redux/authSelectors';
import { setTaskId, updateTask } from 'redux/mainReducer';
import { TaskItemProps } from './TaskItem.interfaces';
import s from './TaskItem.module.css';

export const TaskItem: React.FC<TaskItemProps> = ({ chosenDate, task, taskId }) => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);

    const handleClick = () => dispatch(setTaskId(taskId))

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask(userId, chosenDate, taskId, { ...task, isDone: e.currentTarget.checked }))
    }

    return <div className={s.taskItem}>
        <CheckBox onchange={handleChange} isChecked={task.isDone} />
        <div className={s.taskLink} onClick={handleClick}>
            <NavLink to={'/task'}>{task.name}</NavLink>
        </div>
    </div>
}