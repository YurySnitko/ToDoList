import React from 'react';
import { CheckBoxProps } from './CheckBox.interfaces';
import s from './CheckBox.module.css';

export const CheckBox: React.FC<CheckBoxProps> = ({ onchange, isChecked }) => {
  return (
    <label className={s.customCheckbox}>
      <input type="checkbox" onChange={onchange} checked={isChecked} />
      <div></div>
    </label>
  );
};
