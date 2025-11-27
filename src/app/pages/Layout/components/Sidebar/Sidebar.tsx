import { FC } from 'react';
import 'app/pages/Layout/components/Sidebar/Sidebar.css';
import { Box } from '@mui/material';
import { SidebarProps } from 'app/pages/Layout/components/Sidebar/SidebarProps.types';

export const Sidebar: FC<SidebarProps> = ({ children, open = false }) => {
  if (!children || !open) return null;

  return (
    <Box component="aside" sx={{ flexGrow: 1, padding: 1, mt: 4, maxWidth: '280px' }}>
      {children}
    </Box>
  );
};
