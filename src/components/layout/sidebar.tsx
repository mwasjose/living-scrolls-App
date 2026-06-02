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
    ],
  },
  {
    title: 'Connect',
    items: [
      { label: 'AI Lessons', href: '/ai-lessons', icon: Sparkles },
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
            className="fixed inset-0 z-40 bg-[var(--bg)]/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          x: isLarge ? 0 : isOpen ? 0 : -280,
          width: isLarge && isCollapsed ? 92 : 280,
        }}
        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
        className={`fixed left-0 top-0 z-50 h-screen border-r border-[var(--border)] bg-[var(--background)]/95 p-4 shadow-soft backdrop-blur-xl lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className={`mb-8 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-3`}>
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] shadow-sm">
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
              {!isCollapsed ? <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)] font-semibold font-title">{section.title}</p> : null}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      title={item.label}
                      className={`group relative flex items-center gap-3 text-sm transition duration-150 ${
                        isCollapsed ? 'justify-center' : 'justify-start'
                      } ${
                        isActive
                          ? 'text-[var(--accent)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <span className={isActive ? 'absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-sm bg-[var(--accent)]' : 'absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-sm bg-transparent'} />
                      <Icon className={isCollapsed ? 'h-4 w-4' : 'h-4 w-4 flex-shrink-0'} strokeWidth={1.8} />
                      {!isCollapsed ? (
                        <span className="font-medium font-title">{item.label}</span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!isCollapsed ? (
          <div className="mt-auto rounded-lg border border-[var(--border)] bg-transparent p-3 text-sm text-[var(--text-secondary)]">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Tip</p>
            <p className="mt-2 text-[var(--text-secondary)] text-xs leading-relaxed">Focus on one passage daily.</p>
          </div>
        ) : null}
      </motion.aside>
    </>
  );
}
