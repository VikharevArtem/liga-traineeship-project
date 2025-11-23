import { FC } from 'react';
import 'app/pages/Layout/components/Sidebar/Sidebar.css';
import { SidebarProps } from 'app/pages/Layout/components/Sidebar/SidebarProps.types';

export const Sidebar: FC<SidebarProps> = ({ children }) => {
  return <aside className="sidebar">{children}</aside>;
};
