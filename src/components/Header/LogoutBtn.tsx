import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authReducer';
import s from './Header.module.css';

const LogoutBtn: React.FC = () => {
    const dispatch = useDispatch();
    const logoutCallback = () => dispatch(logout())

    return <div>
        <button className={s.btn} onClick={logoutCallback}>Sign Out</button>
    </div>
}

export default LogoutBtn