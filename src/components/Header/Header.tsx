import { useSelector } from 'react-redux';
import { getIsAuth } from 'redux/authSelectors';
import s from './Header.module.css';
import LogoutBtn from 'controls/LogoutBtn/LogoutBtn';

export const Header = () => {
    const isAuth = useSelector(getIsAuth);

    return <header className={s.header}>
        <div className={s.appName}>
            Tassker
        </div>
        {isAuth && <LogoutBtn />}
    </header>
}