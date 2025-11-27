import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    bgColor: Palette['primary'];
    headerBgColor: Palette['primary'];
    footerBgColor: Palette['primary'];
    important: Palette['primary'];
    inputBgColor: Palette['primary'];
  }

  interface PaletteOptions {
    bgColor?: PaletteOptions['primary'];
    headerBgColor?: PaletteOptions['primary'];
    footerBgColor?: PaletteOptions['primary'];
    important?: PaletteOptions['primary'];
    inputBgColor?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: '#6dcbf7ff',
      light: '#aee3fcff',
    },
    secondary: {
      main: '#2C2C2CA5',
    },
    error: {
      main: '#d32f2f',
    },
    bgColor: {
      main: '#eed9c8',
    },
    headerBgColor: {
      main: '#2a2a2bff',
    },
    footerBgColor: {
      main: '#2a2a2bff',
    },
    important: {
      main: '#f84d4dff',
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff',
    },
    inputBgColor: {
      main: '#aee3fcff',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          padding: '8px 22px',
          minWidth: 64,
          transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
          backgroundColor: theme.palette.primary.main,

          '&.MuiButton-outlined': {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: `0 0 0 1px ${theme.palette.primary.main}40`,
              backgroundColor: 'rgba(76, 142, 172, 1)',
            },
          },
          '&.MuiButton-contained': {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            },
            '&:active': {
              boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
            },
          },
        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.inputBgColor.main,
          borderRadius: 8,
          transition: 'border-color 0.2s ease, border-width 0.2s ease',

          '&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
          },
          '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
          },
        }),
        notchedOutline: {
          borderColor: 'inherit',
        },
        input: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'inherit',
          },
        },
        icon: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          '&.Mui-focused': {
            color: theme.palette.text.primary,
          },
        }),
        outlined: {
          color: 'rgba(0, 0, 0, 0.8)',
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          fontSize: '0.875rem',
          padding: '8px 16px',
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            fontWeight: 600,
          },
          '&:hover, &.Mui-selected:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }),
      },
    },

    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
  },
});
