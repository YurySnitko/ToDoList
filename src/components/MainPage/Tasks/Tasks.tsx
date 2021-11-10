import { Moment } from 'moment';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getDateTasks } from '../../../redux/mainSelectors';
import { TaskItem } from './TaskItem';
import s from './Tasks.module.css';

export const Tasks: React.FC<PropsType> = ({ chosenDate }) => {
    const tasks = useSelector(getDateTasks);
    return <div className={s.tasksContainer}>
        <div>
            {tasks ? Object.keys(tasks).length : 'No'} Tasks Today
        </div>
        {tasks && Object.entries(tasks).map((task) =>
            <TaskItem task={task[1]} key={task[0]} taskId={task[0]} chosenDate={chosenDate} />)}
        <div className={s.addTaskBtn}>
            <NavLink to='/newtask'>Add a New Task</NavLink>
        </div>
    </div>
}

type PropsType = {
    chosenDate: Moment
}