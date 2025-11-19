import { FC } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { LayoutProps } from './LayoutProps.types';
import { PageContainer } from 'components/PageContainer';
import './Layout.css';

export const Layout: FC<LayoutProps> = ({ children, headerChildren, pageContainerClassName }) => {
  return (
    <>
      <Header>{headerChildren}</Header>
      <main>
        <div className="wrap">
          <PageContainer className={pageContainerClassName}>{children}</PageContainer>
        </div>
      </main>
      <Footer />
    </>
  );
};
