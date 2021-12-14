import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { signUp } from 'redux/authReducer';
import s from './SignUp.module.css';
import loginLogo from 'assets/loginlogo.png';

const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
    const dispatch = useDispatch();

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        dispatch(signUp(email.value, password.value))
        history.push("/main");
    }, [history, dispatch])

    return <div className={s.container}>
        <h1>Sign Up</h1>
        <div>
            <img src={loginLogo} alt='login logo' />
        </div>
        <form className={s.formContainer} onSubmit={handleSignUp}>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Sign Up</button>
        </form>
    </div>
}

export default withRouter(SignUp);

