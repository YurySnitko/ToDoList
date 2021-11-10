import React, { useEffect } from 'react';
import { Moment } from 'moment';
import { Redirect, Route, Switch } from 'react-router';
import MainPage from './MainPage';
import AddNewTask from './AddNewTask';
import { getChosenDate, initializeApp } from '../../redux/mainReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getDate, getInitialized } from '../../redux/mainSelectors';
import { getUserId } from '../../redux/authSelectors';
import { TaskPage } from '../TaskPage/TaskPage';


const MainContainer = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    const chosenDate = useSelector(getDate);
    const initialized = useSelector(getInitialized);
    
    const onCalendarItemChanged = (date: Moment) => dispatch(getChosenDate(date));

    useEffect(() => {
        dispatch(initializeApp(userId))
    }, [userId, dispatch])

    return !initialized
        ? 'loading...'
        : <Switch>
            <Route path='/main' render={
                () => <MainPage chosenDate={chosenDate} onCalendarItemChanged={onCalendarItemChanged} />} />
            <Route path='/newtask' render={() => <AddNewTask chosenDate={chosenDate} />} />
            <Route path='/task' render={() => <TaskPage chosenDate={chosenDate} />} />
            <Redirect to='/main' />
        </Switch>
}

export default MainContainer