import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { AccessibilityProvider } from '../contexts/AccessibilityContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <AccessibilityProvider>
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-grow w-full">
          {/* Skip link target */}
          <div id="main-content" className="sr-only" tabIndex={-1}></div>
          {children}
        </main>
        <Footer />
      </div>
    </AccessibilityProvider>
  );
};

export default MainLayout;