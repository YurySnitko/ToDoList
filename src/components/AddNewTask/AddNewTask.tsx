import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { getUserId } from 'redux/authSelectors';
import { addTask } from 'redux/mainReducer';
import { AddNewTaskProps } from './AddNewTask.interfaces';
import s from './AddNewTask.module.css';

const AddNewTask: React.FC<RouteComponentProps & AddNewTaskProps> = ({ chosenDate, history }) => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);

    const addTaskHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const taskData = {
            name: event.currentTarget.taskName.value,
            text: event.currentTarget.taskText.value,
            isDone: false
        }

        dispatch(addTask(userId, chosenDate, taskData))
        history.push("/main");
    }

    return <div className={s.addTaskContainer}>
        <h1>Create New Task</h1>
        <form onSubmit={addTaskHandler} className={s.taskForm}>
            <input type="text" name="taskName" placeholder="Task name" />
            <textarea name="taskText" placeholder="Enter your task..." />
            <button type="submit">Add</button>
        </form>
    </div>
}

export default withRouter(AddNewTask)