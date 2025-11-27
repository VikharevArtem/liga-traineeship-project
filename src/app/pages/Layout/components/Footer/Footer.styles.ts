import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.footerBgColor?.main,
  color: theme.palette.text.secondary,
  marginTop: 'auto',
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  display: 'flex',
  justifyContent: 'center',
}));
