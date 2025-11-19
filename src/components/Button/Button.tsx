import { ButtonProps } from './Button.types';
import './Button.css';

export const Button = ({ children, onClick, buttonClassName, disabled, type }: ButtonProps) => {
  return (
    <button className={'custom-btn ' + buttonClassName} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
