import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import ScrollProgressBar from './common/ScrollProgressBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-white">
    <ScrollProgressBar />
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;