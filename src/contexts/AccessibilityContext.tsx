import React, { createContext, useContext, useEffect, useState } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityContextType {
  fontSize: FontSize;
  highContrast: boolean;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within an AccessibilityProvider');
  return ctx;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [highContrast, setHighContrast] = useState(false);

  const increaseFontSize = () => setFontSize((v) => (v === 'normal' ? 'large' : 'xlarge'));
  const decreaseFontSize = () => setFontSize((v) => (v === 'xlarge' ? 'large' : 'normal'));
  const resetFontSize = () => setFontSize('normal');
  const toggleHighContrast = () => setHighContrast((v) => !v);

  useEffect(() => {
    const root = document.documentElement;
    root.className = root.className.replace(/font-size-\w+/g, '');
    root.classList.add(`font-size-${fontSize}`);
    if (highContrast) root.classList.add('high-contrast');
    else root.classList.remove('high-contrast');
  }, [fontSize, highContrast]);

  return (
    <AccessibilityContext.Provider value={{ fontSize, highContrast, increaseFontSize, decreaseFontSize, resetFontSize, toggleHighContrast }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

