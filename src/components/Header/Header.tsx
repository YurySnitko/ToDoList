import { useSelector } from 'react-redux';
import s from './Header.module.css';
import LogoutBtn from 'controls/LogoutBtn/LogoutBtn';
import React from 'react';
import { getIsAuth } from 'redux/AuthReducer/authSelectors';

export const Header: React.FC = () => {
  const isAuth = useSelector(getIsAuth);

  return (
    <header className={s.header}>
      <div className={s.appName}>Tassker</div>
      {isAuth && <LogoutBtn />}
    </header>
  );
};
