import { Container, Box, List, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

export const TitleTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginLeft: theme.spacing(1),
}));

export const ErrorTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  margin: theme.spacing(2, 0),
}));

export const CircularProgressBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
});

export const TaskListWrapper = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  flexGrow: 1,
}));

export const EmptyStateBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
  marginTop: theme.spacing(4),
}));

export const PaginationBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 'auto',
  paddingTop: theme.spacing(2),
}));
