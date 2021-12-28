import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { signUp } from 'redux/AuthReducer/authReducer';
import s from './SignUp.module.css';
import loginLogo from 'assets/loginlogo.png';
import { NavLink } from 'react-router-dom';
import { BaseBtn } from 'controls/BaseBtn/BaseBtn';

const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      dispatch(signUp(email.value, password.value));
      history.push('/main');
    },
    [history, dispatch]
  );

  return (
    <div className={s.container}>
      <h1>Sign Up</h1>
      <div>
        <img src={loginLogo} alt="login logo" />
      </div>
      <form className={s.formContainer} onSubmit={handleSignUp}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <BaseBtn type="primary" htmlType="submit" block={true}>
          Sign up
        </BaseBtn>
      </form>
      <div className={s.navLink}>
        Have an account? <NavLink to="/login">Log In</NavLink>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
