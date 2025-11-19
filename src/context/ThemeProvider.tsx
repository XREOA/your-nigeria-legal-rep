import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Determine theme based on actual user's current time
    const getThemeByTime = (): Theme => {
      const hour = new Date().getHours();
      // Dark theme: 18:00 (6pm) to 06:00 (6am)
      // Light theme: 06:00 (6am) to 18:00 (6pm)
      return hour >= 6 && hour < 18 ? 'light' : 'dark';
    };

    const currentTheme = getThemeByTime();
    setTheme(currentTheme);
    
    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(currentTheme);
    root.setAttribute('data-theme', currentTheme);

    // Check for theme changes every minute
    const interval = setInterval(() => {
      const newTheme = getThemeByTime();
      if (newTheme !== currentTheme) {
        setTheme(newTheme);
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);
        root.setAttribute('data-theme', newTheme);
      }
    }, 60000); // Check every minute

    setMounted(true);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
