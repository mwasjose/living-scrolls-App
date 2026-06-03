'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('living-scrolls-theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    setThemeMode(savedTheme || systemTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    window.localStorage.setItem('living-scrolls-theme', themeMode);
  }, [themeMode]);

  return (
    <div className="main-shell min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text-primary)]">
      <Navbar
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
        isSidebarCollapsed={isSidebarCollapsed}
        themeMode={themeMode}
        toggleTheme={() => setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      />
      <Sidebar isOpen={isSidebarOpen} isCollapsed={isSidebarCollapsed} onClose={() => setIsSidebarOpen(false)} />
      <main className={`relative pt-[72px] transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-[92px]' : 'lg:pl-[280px]'}`}>
        <div className="responsive-container pb-[96px] lg:pb-14">{children}</div>
      </main>
    </div>
  );
}
