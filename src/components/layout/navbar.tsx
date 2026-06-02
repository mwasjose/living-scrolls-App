'use client';

import { useState } from 'react';
import { Menu, Bell, User, Search, Moon, SunMedium } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';

interface NavbarProps {
  onOpenSidebar: () => void;
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Navbar({ onOpenSidebar, onToggleSidebar, isSidebarCollapsed, themeMode, toggleTheme }: NavbarProps) {
  const { user } = useAuth();
  const { profile } = useUserProfile(user?.uid ?? null);
  const notifications = profile?.notifications ?? [];
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav
      className={`fixed top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[var(--surface-strong)] bg-[var(--background)]/95 px-3 text-[var(--text-primary)] backdrop-blur-xl transition-[left,width] duration-300 lg:px-6 ${
        isSidebarCollapsed ? 'lg:left-[92px] lg:w-[calc(100%_-_92px)]' : 'lg:left-[280px] lg:w-[calc(100%_-_280px)]'
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 rounded-lg hover:text-[var(--accent)] hover:bg-[var(--card-soft)] transition text-[var(--text-secondary)] lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:text-[var(--accent)] hover:bg-[var(--card-soft)] transition text-[var(--text-secondary)] hidden lg:inline-flex"
          aria-label="Collapse navigation"
        >
          <Menu size={18} />
        </button>

        <div className="hidden min-w-0 flex-1 sm:block lg:max-w-xl xl:max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
            <input
              type="text"
              placeholder="Search Torah, scripture, reflections..."
              className="h-10 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-12 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--focus-ring)] placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 md:gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:text-[var(--accent)] hover:bg-[var(--card-soft)] transition text-[var(--text-secondary)]"
          aria-label="Toggle dark mode"
        >
          {themeMode === 'dark' ? <SunMedium size={18} /> : <Moon size={18} />}
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications((open) => !open)}
            className="relative p-2 hover:text-[var(--accent)] transition text-[var(--text-secondary)]"
            aria-haspopup="dialog"
            aria-expanded={showNotifications}
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[var(--color-avast-red)] animate-pulse" />
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full z-50 mt-2 w-[320px] rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-3 shadow-soft">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[var(--text-primary)]">Notifications</p>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs uppercase tracking-[0.24em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
                >
                  Close
                </button>
              </div>
              {notifications.length > 0 ? (
                <div className="space-y-2">
                  {notifications.slice(0, 4).map((item) => (
                    <div key={item.id} className="rounded-lg border border-[var(--border)] bg-transparent p-3 hover:bg-[var(--surface-soft)] transition">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
                      <p className="mt-1 text-xs text-[var(--text-secondary)]">{item.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-[var(--border)] bg-transparent p-4 text-sm text-[var(--text-secondary)]">
                  No notifications yet. Continue your study to receive reminders and encouragement.
                </div>
              )}
            </div>
          )}
        </div>
        <div className="rounded-2xl p-2 hover:bg-[var(--card-soft)] transition text-[var(--text-secondary)]">
          <User size={16} />
        </div>
      </div>
    </nav>
  );
}
