import { NavLink } from 'react-router-dom';
import { NavButtonProps } from 'app/pages/Layout/components/Header/components/NavButton/NavButton.types';
import { Button } from 'components/Button/Button';

export const NavButton = ({ to, text, children, onClick }: NavButtonProps): JSX.Element => {
  return (
    <NavLink to={to}>
      <Button onClick={onClick}>
        {text}
        {children}
      </Button>
    </NavLink>
  );
};
