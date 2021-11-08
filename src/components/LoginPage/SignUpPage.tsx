import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { signUp } from '../../redux/authReducer';
import s from './SignUpPage.module.css';

const SignUpPage = ({history}: {history: any}) => {
    const dispatch = useDispatch();

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        dispatch(signUp(email.value, password.value))
        history.push("/main");
    }, [history])

    return <div className={s.container}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Sign Up</button>
        </form>
    </div>
}

export default withRouter(SignUpPage);

