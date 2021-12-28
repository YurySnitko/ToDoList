import React, { useEffect } from 'react';
import { Moment } from 'moment';
import { Redirect, Route, Switch } from 'react-router';
import { getChosenDate, initializeApp } from 'redux/MainReducer/mainReducer';
import { useDispatch, useSelector } from 'react-redux';
import { TaskPage } from '../TaskPage/TaskPage';
import AddNewTask from 'components/AddNewTask/AddNewTask';
import TasksOverview from '../TasksOverview/TasksOverview';
import { getUserId } from 'redux/AuthReducer/authSelectors';
import { getDate, getInitialized } from 'redux/MainReducer/mainSelectors';

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const chosenDate = useSelector(getDate);
  const initialized = useSelector(getInitialized);

  const onCalendarItemChanged = (date: Moment) => dispatch(getChosenDate(date));

  useEffect(() => {
    dispatch(initializeApp(userId));
  }, [userId, dispatch]);

  return !initialized ? (
    <div>loading...</div>
  ) : (
    <Switch>
      <Route
        path="/main"
        render={() => (
          <TasksOverview
            chosenDate={chosenDate}
            onCalendarItemChanged={onCalendarItemChanged}
          />
        )}
      />
      <Route
        path="/newtask"
        render={() => <AddNewTask chosenDate={chosenDate} />}
      />
      <Route path="/task" render={() => <TaskPage chosenDate={chosenDate} />} />
      <Redirect to="/main" />
    </Switch>
  );
};

export default Main;
