import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

interface LayoutProps {
  children?: React.ReactNode;
}

function Layout({children}: LayoutProps) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}

export default Layout;
