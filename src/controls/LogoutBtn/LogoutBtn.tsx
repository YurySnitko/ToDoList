import { BaseBtn } from 'controls/BaseBtn/BaseBtn';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/authReducer';
import s from './LogoutBtn.module.css';

const LogoutBtn: React.FC = () => {
    const dispatch = useDispatch();
   // const logoutCallback = () => dispatch(logout())

    return <BaseBtn type="primary" onclick={() => dispatch(logout())}>Sign out</BaseBtn>
    // return <div>
    //     <button className={s.btn} onClick={logoutCallback}>Sign Out</button>
    // </div>
}

export default LogoutBtn