import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledPaginationWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 'auto',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(1),
}));
