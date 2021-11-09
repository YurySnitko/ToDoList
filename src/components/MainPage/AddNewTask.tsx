import { Moment } from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { getUserId } from '../../redux/authSelectors';
import { addTask } from '../../redux/mainReducer';
import s from './AddNewTask.module.css';

type PropsType = {
    chosenDate: Moment | null
}

const AddNewTask: React.FC<RouteComponentProps & PropsType> = (props) => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);

    const addTaskHandler = async (event: any) => {
        event.preventDefault();
        const {taskName, taskText} = event.target.elements;
        const taskData = {
            name: taskName.value,
            text: taskText.value,
            isDone: false
        }

        if (props.chosenDate) {
            dispatch(addTask(userId, props.chosenDate, taskData))
            props.history.push("/main");
        }
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