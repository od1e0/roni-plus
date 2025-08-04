import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AccessibilityMode } from '../types';

interface AccessibilityContextType {
  mode: AccessibilityMode;
  setMode: (mode: AccessibilityMode) => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  isAccessibilityPanelOpen: boolean;
  openAccessibilityPanel: () => void;
  closeAccessibilityPanel: () => void;
}

const STORAGE_KEY = 'roni-plus-accessibility-preferences';

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface StoredPreferences {
  mode?: AccessibilityMode;
  fontSize?: number;
  highContrast?: boolean;
}

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  // Load saved preferences from localStorage if available
  const loadSavedPreferences = (): StoredPreferences => {
    try {
      const savedPrefs = localStorage.getItem(STORAGE_KEY);
      return savedPrefs ? JSON.parse(savedPrefs) : {};
    } catch (error) {
      console.error('Error loading accessibility preferences:', error);
      return {};
    }
  };

  const savedPreferences = loadSavedPreferences();
  
  const [mode, setMode] = useState<AccessibilityMode>(savedPreferences.mode || 'default');
  const [fontSize, setFontSize] = useState<number>(savedPreferences.fontSize || 16);
  const [highContrast, setHighContrast] = useState<boolean>(savedPreferences.highContrast || false);
  const [isAccessibilityPanelOpen, setIsAccessibilityPanelOpen] = useState<boolean>(false);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, fontSize, highContrast }));
    } catch (error) {
      console.error('Error saving accessibility preferences:', error);
    }
  }, [mode, fontSize, highContrast]);

  // Handle custom event for closing the accessibility panel
  useEffect(() => {
    const handleAccessibilityClose = () => {
      setIsAccessibilityPanelOpen(false);
    };

    document.addEventListener('accessibility-close', handleAccessibilityClose);
    
    return () => {
      document.removeEventListener('accessibility-close', handleAccessibilityClose);
    };
  }, []);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 1, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 1, 14));
  const toggleHighContrast = () => setHighContrast(prev => !prev);
  
  const openAccessibilityPanel = () => setIsAccessibilityPanelOpen(true);
  const closeAccessibilityPanel = () => setIsAccessibilityPanelOpen(false);

  // Apply CSS classes based on accessibility preferences
  const getAccessibilityClasses = () => {
    const classes = [];
    
    // Apply mode-specific classes
    if (mode === 'blind') {
      classes.push('blind-mode');
    } else if (mode === 'deaf') {
      classes.push('deaf-mode');
    }
    
    // Apply high-contrast class if enabled
    if (highContrast) {
      classes.push('high-contrast');
    }
    
    return classes.join(' ');
  };

  return (
    <AccessibilityContext.Provider 
      value={{ 
        mode, 
        setMode, 
        fontSize, 
        increaseFontSize, 
        decreaseFontSize,
        highContrast,
        toggleHighContrast,
        isAccessibilityPanelOpen,
        openAccessibilityPanel,
        closeAccessibilityPanel
      }}
    >
      <div 
        className={`${getAccessibilityClasses()}`} 
        style={{ fontSize: `${fontSize}px` }}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};