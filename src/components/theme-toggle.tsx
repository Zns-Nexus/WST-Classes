'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from '@phosphor-icons/react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const syncTheme = () => setDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(syncTheme);
    syncTheme();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    setDark(next);
    try {
      localStorage.setItem('wst-theme', next ? 'dark' : 'light');
    } catch {
      // The toggle still works when the browser blocks local storage.
    }
  }

  return <button className="theme-toggle" type="button" aria-label="Dark mode" aria-pressed={dark} title={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleTheme}>
    {dark ? <Sun size={21} /> : <Moon size={21} />}
  </button>;
}
