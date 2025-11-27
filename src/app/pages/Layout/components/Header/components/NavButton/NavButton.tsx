import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { NavButtonProps } from 'app/pages/Layout/components/Header/components/NavButton/NavButton.types';

export const NavButton = ({ to, text, onClick }: NavButtonProps): JSX.Element => {
  return (
    <NavLink to={to}>
      <Button variant="contained" color="primary" onClick={onClick}>
        {text}
      </Button>
    </NavLink>
  );
};
