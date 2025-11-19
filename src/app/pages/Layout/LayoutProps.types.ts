import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
  headerChildren?: ReactNode;
  pageContainerClassName?: string;
}
