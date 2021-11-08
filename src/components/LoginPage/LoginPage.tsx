import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';
import s from './LoginPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authReducer';
import { getIsAuth } from '../../redux/authSelectors';

const LoginPage = ({history}: {history: any}) => {
    const dispatch = useDispatch();

    const handleLogin = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        dispatch(login(email.value, password.value))
        history.push("/main");
    }, [history])

    const isAuth = useSelector(getIsAuth);

    if (isAuth) {
        return <Redirect to="/main" />
    }

    return <div className={s.container}>
        <h1>Log In</h1>
        <form onSubmit={handleLogin}>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Log in</button>
        </form>
        <div>
            Don't have an account? <NavLink to='/signup'>Sign Up</NavLink>
        </div>
    </div>
}

export default withRouter(LoginPage);