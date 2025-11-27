import { styled } from '@mui/material/styles';
import { Box, TextField, Button, FormControl, FormControlLabel } from '@mui/material';

export const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== '$hasError',
})<{ $hasError?: boolean }>(({ theme, $hasError }) => ({
  margin: theme.spacing(2, 0),
  '& .MuiOutlinedInput-root': {
    boxShadow: $hasError ? '0 0 6px rgba(255, 0, 0, 0.3)' : 'none',
    fieldset: {
      borderColor: $hasError ? theme.palette.error.main : undefined,
    },
    '&:hover fieldset': {
      borderColor: $hasError ? theme.palette.error.main : undefined,
    },
  },
  '& .MuiFormHelperText-root': {
    color: $hasError ? theme.palette.error.main : undefined,
  },
}));

export const CheckboxContainer = styled(FormControl)({
  flex: '1',
  minWidth: '100px',
  maxWidth: '50%',
  display: 'flex',
  alignItems: ' center',
  margin: 0,
});

export const StyledCheckboxLabel = styled(FormControlLabel, {
  shouldForwardProp: (prop) => prop !== '$hasError',
})<{ $hasError?: boolean }>(({ theme, $hasError }) => ({
  '.MuiFormControlLabel-label': {
    color: $hasError ? theme.palette.error.main : 'inherit',
  },
  margin: 0,
  marginBottom: theme.spacing(1),
}));

export const CheckboxWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: theme.spacing(2),
  minHeight: 100,
}));

export const SubmitButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== '$isValid',
})<{ $isValid: boolean }>(({ $isValid }) => ({
  opacity: $isValid ? 1 : 0.7,
  pointerEvents: $isValid ? 'auto' : 'none',
}));
