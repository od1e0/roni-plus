import React from 'react';
import Header from '../components/layout/Header';
import TopPanel from '../components/layout/TopPanel';
import Footer from '../components/layout/Footer';
import FloatingContactButton from '../components/FloatingContactButton';
import { AccessibilityProvider } from '../contexts/AccessibilityContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <AccessibilityProvider>
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <TopPanel />
        <Header logo="/logo.svg" />
        <main className="flex-grow w-full">
          {/* Skip link target */}
          <div id="main-content" className="sr-only" tabIndex={-1}></div>
          {children}
        </main>
        <Footer />
        <FloatingContactButton />
      </div>
    </AccessibilityProvider>
  );
};

export default MainLayout;