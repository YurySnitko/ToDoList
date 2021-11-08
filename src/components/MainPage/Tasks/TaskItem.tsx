import React, { useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserId } from '../../../redux/authSelectors';
import { setTaskId, updateTask } from '../../../redux/mainReducer';
import { TaskType } from '../../../redux/mainReducer';
import s from './TaskItem.module.css';

type PropsType = {
    task: TaskType
    chosenDate: any
    taskId: string
}

export const TaskItem = (props: PropsType) => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);

    const checkbox = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        dispatch(setTaskId(props.taskId))
    }

    useLayoutEffect(() => {
        const {current} = checkbox;
        if (null !== checkbox.current) {
            checkbox.current.checked = props.task.isDone;
        }

        const handleChange = () => {
            if (checkbox.current) {
                const taskData = {...props.task, isDone: checkbox.current?.checked};
                dispatch(updateTask(userId, props.chosenDate, props.taskId, taskData))}
        }
        
        current?.addEventListener('change', handleChange);
        return () => current?.removeEventListener('change', handleChange);
    }, [props.chosenDate])

    return <div className={s.taskItem}>
        <label className={s.customCheckbox}>
            <input type="checkbox" ref={checkbox} />
            <div></div>
        </label>
        <div className={s.taskLink} onClick={handleClick}>
            <NavLink to={'/task'}>{props.task.name}</NavLink>
        </div>
    </div>
}