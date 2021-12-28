import cn from 'classnames';
import React from 'react';
import { SkipBtnProps } from './SkipBtn.interfaces';
import s from './SkipBtn.module.css';

export const SkipBtn: React.FC<SkipBtnProps> = ({ onclick, direction }) => {
  return (
    <button
      className={cn(
        s.navArrow,
        { [s.right]: direction === 'right' },
        { [s.left]: direction === 'left' }
      )}
      onClick={() => onclick(direction)}
    />
  );
};
