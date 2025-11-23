import { FC } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { LayoutProps } from './LayoutProps.types';
import { Sidebar } from './components/Sidebar/Sidebar';
import { PageContainer } from 'components/PageContainer';
import './Layout.css';

export const Layout: FC<LayoutProps> = ({
  children,
  headerChildren,
  pageContainerClassName,
  childrenSidebar,
  sidebarPosition,
}) => {
  const containerClass = sidebarPosition
    ? `layout-container-with-sidebar sidebar-${sidebarPosition}`
    : 'layout-container';

  return (
    <>
      <Header>{headerChildren}</Header>
      <div className={containerClass}>
        {childrenSidebar && <Sidebar className="sidebar">{childrenSidebar}</Sidebar>}
        <main className="main-container">
          <div className="wrap">
            <PageContainer className={pageContainerClassName}>{children}</PageContainer>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};
