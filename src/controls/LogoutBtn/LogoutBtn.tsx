import { BaseBtn } from 'controls/BaseBtn/BaseBtn';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/AuthReducer/authReducer';

const LogoutBtn: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <BaseBtn type="primary" onclick={() => dispatch(logout())}>
      Sign out
    </BaseBtn>
  );
};

export default LogoutBtn;
