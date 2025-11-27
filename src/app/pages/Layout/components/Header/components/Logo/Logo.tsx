import { Box } from '@mui/material';
import logo from 'assets/images/Logo.png';

export function Logo() {
  return <Box component="img" src={logo} alt="logo-img" sx={{ width: 60, height: 60 }}></Box>;
}
