import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authReducer';
import { getIsAuth } from '../redux/authSelectors';
import s from './Header.module.css';

export const Header = () => {
    const isAuth = useSelector(getIsAuth);
    const dispatch = useDispatch();
    const logoutCallback = () => {
        dispatch(logout())
    }

    return <header className={s.header}>
        <div className={s.appName}>
            Tassker
        </div>
        {isAuth && <div>
            <button className={s.btn} onClick={logoutCallback}>Sign Out</button>
        </div>
        }
        
    </header>
}