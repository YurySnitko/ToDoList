import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import Main from './components/Main/Main';
import SignUp from 'components/SignUp/SignUp';
import Login from 'components/Login/Login';
import { getIsAuth } from 'redux/AuthReducer/authSelectors';
import React from 'react';

export const AppRoute: React.FC = () => {
  const isAuth = useSelector(getIsAuth);

  return isAuth ? (
    <Main />
  ) : (
    <Switch>
      <Route path="/signup" render={() => <SignUp />} />
      <Route path="/login" render={() => <Login />} />
      <Redirect to="/login" />
    </Switch>
  );
};
