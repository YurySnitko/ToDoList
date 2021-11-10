import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import s from './LoginPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authReducer';
import { getIsAuth } from '../../redux/authSelectors';
import loginLogo from '../../assets/loginlogo.png';

const LoginPage: React.FC<RouteComponentProps> = ({history}) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth);

    const handleLogin = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        dispatch(login(email.value, password.value))
        history.push("/main");
    }, [history, dispatch])

    return isAuth
        ? <Redirect to="/main" />
        : <div className={s.container}>
            <h1>Log In</h1>
            <div>
                <img src={loginLogo} alt='login logo' />
            </div>
            <form className={s.formContainer} onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Log in</button>
            </form>
            <div className={s.navLink}>
                Don't have an account? <NavLink to='/signup'>Sign Up</NavLink>
            </div>
        </div>
}

export default withRouter(LoginPage);