import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { getIsAuth } from '../redux/authSelectors';
import LoginPage from './LoginPage/LoginPage';
import SignUpPage from './LoginPage/SignUpPage';
import MainContainer from './MainPage/MainContainer';

export const AppRoute = () => {
    const isAuth = useSelector(getIsAuth);

    return isAuth ? <MainContainer />
        : (<Switch>
            <Route path='/signup' render={() => <SignUpPage />} />
            <Route path='/login' render={() => <LoginPage />} />
            <Redirect to='/login' />
        </Switch>)
}
