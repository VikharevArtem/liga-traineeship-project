import { FC } from 'react';
import { Header } from 'app/pages/Layout/components/Header/Header';
import { LayoutProps } from 'app/pages/Layout/LayoutProps.types';
import { Sidebar } from 'app/pages/Layout/components/Sidebar/Sidebar';
import { Footer } from 'app/pages/Layout/components/Footer/Footer';
import {
  StyledPageContainer,
  StyledContentContainer,
  StyledSidebarWrapper,
  StyledMain,
} from 'app/pages/Layout/Layout.styles';

export const Layout: FC<LayoutProps> = ({ children, headerChildren, childrenSidebar, sidebarPosition = 'left' }) => {
  const isLeft = sidebarPosition === 'left';
  const hasSidebar = !!childrenSidebar;

  return (
    <StyledPageContainer maxWidth="md" disableGutters>
      <Header>{headerChildren}</Header>
      <StyledContentContainer maxWidth={!hasSidebar ? 'sm' : false}>
        {hasSidebar && (
          <StyledSidebarWrapper $isLeft={isLeft}>
            <Sidebar open={true}>{childrenSidebar}</Sidebar>
          </StyledSidebarWrapper>
        )}
        <StyledMain component="main">{children}</StyledMain>
      </StyledContentContainer>
      <Footer />
    </StyledPageContainer>
  );
};
