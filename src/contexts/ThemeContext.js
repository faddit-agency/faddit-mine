import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // 기본값은 다크 모드
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? {
      // 다크 모드 색상
      background: '#0a0a0a',
      surface: '#1a1a1a',
      surfaceSecondary: '#333',
      border: '#333',
      text: '#ffffff',
      textSecondary: '#ccc',
      textTertiary: '#888',
      primary: '#007bff',
      primaryHover: '#0056b3',
      accent: '#667eea',
      accentGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      overlay: 'rgba(255, 255, 255, 0.2)',
      overlayHover: 'rgba(255, 255, 255, 0.3)',
      shadow: 'rgba(0, 0, 0, 0.3)',
    } : {
      // 라이트 모드 색상
      background: '#ffffff',
      surface: '#f8f9fa',
      surfaceSecondary: '#e9ecef',
      border: '#dee2e6',
      text: '#212529',
      textSecondary: '#6c757d',
      textTertiary: '#adb5bd',
      primary: '#007bff',
      primaryHover: '#0056b3',
      accent: '#667eea',
      accentGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      overlay: 'rgba(0, 0, 0, 0.1)',
      overlayHover: 'rgba(0, 0, 0, 0.15)',
      shadow: 'rgba(0, 0, 0, 0.1)',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}; 