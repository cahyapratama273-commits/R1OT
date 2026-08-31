'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  isSystemTheme: true,
  toggleTheme: () => {},
  resetToSystemTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (isDark) => {
      const selectedTheme = isDark ? 'dark' : 'light';
      setTheme(selectedTheme);
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      document.documentElement.setAttribute('data-theme', selectedTheme);
    };

    if (isSystemTheme) {
      applyTheme(mediaQuery.matches);
    }

    const handleThemeChange = (e) => {
      if (isSystemTheme) {
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, [isSystemTheme]);

  const toggleTheme = () => {
    setIsSystemTheme(false);
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      document.documentElement.setAttribute('data-theme', nextTheme);
      return nextTheme;
    });
  };

  const resetToSystemTheme = () => {
    setIsSystemTheme(true);
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const selectedTheme = isDark ? 'dark' : 'light';
      setTheme(selectedTheme);
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      document.documentElement.setAttribute('data-theme', selectedTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isSystemTheme, toggleTheme, resetToSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
