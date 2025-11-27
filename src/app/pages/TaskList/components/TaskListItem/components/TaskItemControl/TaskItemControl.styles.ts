import { Box, IconButton, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ControlContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const ControlItem = styled(ListItemIcon)({
  display: 'flex',
  justifyContent: 'center',
  padding: 0,
  margin: 0,
});

export const EditButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.success.main,
    backgroundColor: theme.palette.action.hover,
    transform: 'scale(1.1)',
    transition: 'all 0.2s ease-in-out',
  },
}));

export const DeleteButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.action.hover,
    transform: 'scale(1.1)',
    transition: 'all 0.2s ease-in-out',
  },
}));
