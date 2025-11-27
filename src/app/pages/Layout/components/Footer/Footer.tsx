import { Typography } from '@mui/material';
import { StyledContainer, StyledFooter } from 'app/pages/Layout/components/Footer/Footer.styles';

export const Footer = () => {
  return (
    <StyledFooter component="footer">
      <StyledContainer>
        <Typography variant="body1">&copy; 2025 Вихарев Артем</Typography>
      </StyledContainer>
    </StyledFooter>
  );
};
