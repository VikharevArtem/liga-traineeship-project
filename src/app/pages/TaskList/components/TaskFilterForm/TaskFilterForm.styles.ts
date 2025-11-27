import { Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  height: '100%',
  boxSizing: 'border-box',
}));

export const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const FiltersBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(1),
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  fontWeight: 500,
}));

export const ResetButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
