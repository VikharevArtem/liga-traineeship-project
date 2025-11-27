import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ConfirmContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[24],
  zIndex: 10,
  width: '100%',
  height: '100%',
  textAlign: 'center',
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  marginTop: theme.spacing(2),
}));
