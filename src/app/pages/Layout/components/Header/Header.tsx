import { AppBar, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Logo } from 'app/pages/Layout/components/Header/components/Logo/Logo';
import { HeaderProps } from 'app/pages/Layout/components/Header/Header.types';

export const Header = ({ children }: HeaderProps): JSX.Element => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'headerBgColor.main' }}>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Link to="/">
              <Logo />
            </Link>
          </Box>
          {children}
        </Box>
      </Container>
    </AppBar>
  );
};
