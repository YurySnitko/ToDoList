import moment from 'moment';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskData, getTaskId } from 'redux/mainSelectors';
import s from './TaskPage.module.css';
import cn from 'classnames';
import { updateTask } from 'redux/mainReducer';
import { getUserId } from 'redux/authSelectors';
import { TaskPageProps } from './TaskPage.interfaces';

export const TaskPage: React.FC<TaskPageProps> = ({ chosenDate }) => {
    const dispatch = useDispatch();
    const taskData = useSelector(getTaskData);
    const userId = useSelector(getUserId);
    const taskId = useSelector(getTaskId)
    const [editMode, setEditMode] = useState<boolean>(false);
    const [taskText, setTaskText] = useState<string>(taskData.text);
    const [taskName, setTaskName] = useState<string>(taskData.name);

    const activateEditMode = () => setEditMode(true);

    const deactivateEditMode = () => {
        const newTaskData = {
            name: taskName,
            text: taskText,
            isDone: taskData.isDone
        }
        dispatch(updateTask(userId, chosenDate, taskId, newTaskData))
        setEditMode(false);
    }

    const onStatusChange = () => {
        const newTaskData = { ...taskData, isDone: !taskData.isDone }
        dispatch(updateTask(userId, chosenDate, taskId, newTaskData))
    }

    const onTaskTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => setTaskText(e.currentTarget.value);

    const onTaskNameChange = (e: ChangeEvent<HTMLInputElement>) => setTaskName(e.currentTarget.value);

    return <div className={s.container}>
        <div className={s.date}>
            {moment().format('DD-MM-YYYY') === chosenDate.format('DD-MM-YYYY')
                ? `Today's task`
                : `Task for ${chosenDate.format('MMMM D, YYYY')}`}
        </div>
        <div className={s.taskName}>
            <div className={cn({ [s.done]: taskData.isDone }, s.taskStatus)} />
            {editMode ? <input onChange={onTaskNameChange} value={taskName} /> : <div>{taskData.name}</div>}
        </div>
        {editMode
            ? (<>
                <div className={s.taskText}>
                    <textarea onChange={onTaskTextChange} value={taskText} />
                </div>
                <button className={cn(s.btn, s.btnEdit)} onClick={deactivateEditMode}>Save</button>
            </>)
            : (<>
                <div className={s.taskText}>{taskData.text}</div>
                <button className={cn(s.btn, s.btnEdit)} onClick={activateEditMode}>Edit</button>
                <button className={cn(s.btn, s.btnStatus)} onClick={onStatusChange}>
                    {taskData.isDone ? 'Incompleted' : 'Completed'}
                </button>
            </>)
        }
    </div>
}