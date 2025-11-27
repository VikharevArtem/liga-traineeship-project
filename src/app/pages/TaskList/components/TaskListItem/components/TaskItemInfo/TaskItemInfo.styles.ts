import { Box, Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const InfoContainer = styled(Box)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignSelf: 'flex-start',
});

export const HeaderBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
});

export const TitleWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
});

export const TaskTitle = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '1.40rem',
  fontWeight: 600,
  lineHeight: 1.2,
  width: '350px',
  color: theme.palette.text.primary,
}));

export const TaskDescription = styled(Typography)({
  alignSelf: 'flex-start',
  marginTop: '8px',
});

export const ChipsContainer = styled(Box)({
  display: 'flex',
  gap: '8px',
});

export const ImportantChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.important?.main,
  color: theme.palette.getContrastText(theme.palette.important?.main || '#f84d4d'),
}));

export const CompletedChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.success?.main,
  color: theme.palette.getContrastText(theme.palette.success?.main || '#4caf50'),
}));
