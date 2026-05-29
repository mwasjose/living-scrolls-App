'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  BookOpen,
  Brain,
  CalendarCheck,
  Languages,
  LayoutDashboard,
  NotebookPen,
  ScrollText,
  Sparkles,
  UserRound,
  UsersRound,
  X,
  Shield,
} from 'lucide-react';

const sidebarSections = [
  {
    title: 'Core study',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Torah Portion', href: '/torah-portions', icon: ScrollText },
      { label: 'Bible Reader', href: '/bible-reader', icon: BookOpen },
      { label: 'Reading Plans', href: '/reading-plans', icon: CalendarCheck },
    ],
  },
  {
    title: 'Growth tools',
    items: [
      { label: 'Trivia', href: '/trivia', icon: Brain },
      { label: 'Hebrew Learning', href: '/hebrew-learning', icon: Languages },
      { label: 'Wisdom Feed', href: '/wisdom', icon: Sparkles },
    ],
  },
  {
    title: 'Community',
    items: [
      { label: 'Journal', href: '/journal', icon: NotebookPen },
      { label: 'AI Lessons', href: '/wisdom', icon: Sparkles },
      { label: 'Community', href: '/community', icon: UsersRound },
      { label: 'Profile', href: '/profile', icon: UserRound },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, isCollapsed, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const m = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsLarge(m.matches);
    update();
    m.addEventListener('change', update);
    return () => m.removeEventListener('change', update);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          x: isLarge ? 0 : isOpen ? 0 : -320,
          width: isLarge && isCollapsed ? 92 : 320,
        }}
        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
        className={`fixed left-0 top-0 z-50 h-screen border-r border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-soft backdrop-blur-xl lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className={`mb-8 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-3`}>
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-avast-cyan)] to-[var(--color-avast-cyan-dim)] text-[var(--color-avast-darker)] shadow-lg">
              <Shield size={22} strokeWidth={2.5} />
            </div>
                {!isCollapsed ? (
              <div>
                <p className="text-sm font-bold text-[var(--text-primary)] leading-tight font-title">Living Scrolls</p>
                <p className="text-xs text-[var(--text-muted)]">Study companion</p>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1 hover:bg-[var(--accent-soft)] transition text-[var(--text-secondary)] lg:hidden"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-8 pb-6">
          {sidebarSections.map((section) => (
            <div key={section.title} className={isCollapsed ? 'text-center' : ''}>
              {!isCollapsed ? <p className="mb-3 px-2 text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)] font-semibold font-title">{section.title}</p> : null}
              <div className="space-y-2">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      title={item.label}
                      className={`relative flex items-center rounded-2xl px-3 py-3 text-sm transition duration-200 ${
                        isCollapsed ? 'justify-center' : 'justify-start'
                      } ${
                        isActive
                          ? 'bg-[var(--accent-soft)] text-[var(--accent)] shadow-[inset_0_0_0_1px_rgba(252,163,17,0.12)]'
                          : 'text-[var(--text-muted)] hover:bg-[var(--surface-soft)] hover:text-[var(--text-secondary)]'
                      }`}
                    >
                      {isActive ? (
                        <span className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-[var(--accent)]" />
                      ) : null}
                      <Icon className={isCollapsed ? 'h-5 w-5' : 'mr-3 h-5 w-5'} strokeWidth={1.8} />
                      {!isCollapsed ? <span className="font-medium font-title">{item.label}</span> : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!isCollapsed ? (
          <div className="mt-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-secondary)] shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Study tip</p>
            <p className="mt-3 text-[var(--text-primary)]">Use the sidebar to keep your reading flow and sacred missions visible at every step.</p>
          </div>
        ) : null}
      </motion.aside>
    </>
  );
}
