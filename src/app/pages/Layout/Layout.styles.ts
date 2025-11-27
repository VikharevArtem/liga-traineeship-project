import { Box, Container, styled } from '@mui/material';

export const StyledPageContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.bgColor?.main || theme.palette.background.default,
}));

export const StyledContentContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  flexGrow: 1,
  width: '100%',
});

export const StyledSidebarWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$isLeft',
})<{ $isLeft: boolean }>(({ $isLeft }) => ({
  order: $isLeft ? 0 : 1,
  minWidth: 200,
  maxWidth: 360,
  flex: '0 1 auto',
  overflowX: 'hidden',
}));

export const StyledMain = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '24px',
  flex: '1 1 0',
});
