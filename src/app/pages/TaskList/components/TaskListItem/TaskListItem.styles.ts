import { ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTaskListItem = styled(ListItem)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  py: theme.spacing(1),
  px: theme.spacing(2),
  backgroundColor: theme.palette.primary.light,
  boxShadow: theme.shadows[1],
  overflow: 'hidden',
}));
