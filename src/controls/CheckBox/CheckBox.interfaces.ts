import { ChangeEvent } from 'react';

export interface CheckBoxProps {
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}
