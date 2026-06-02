'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, LayoutGroup } from 'framer-motion';
import { BookOpen, ScrollText, Sparkles, Home, UserRound } from 'lucide-react';

const bottomNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Torah', href: '/torah-portions', icon: ScrollText },
  { label: 'Bible', href: '/bible-reader', icon: BookOpen },
  { label: 'Profile', href: '/profile', icon: UserRound },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
      className="fixed inset-x-4 z-50 mx-auto max-w-lg rounded-[38px] border border-[var(--border)] bg-[var(--surface)]/95 shadow-soft backdrop-blur-2xl px-3 py-3 lg:hidden"
    >
      <LayoutGroup>
        <div className="grid grid-cols-5 gap-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex items-center justify-center overflow-hidden rounded-3xl px-2 py-2 transition"
              >
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-active"
                    className="absolute inset-0 m-[1px] rounded-[24px] bg-[var(--accent-soft)]/18 shadow-soft"
                    transition={{ type: 'spring', stiffness: 240, damping: 26 }}
                  />
                )}

                <span
                  className={`relative z-10 flex items-center gap-2 transition-all duration-300 ${
                    isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl transition ${
                      isActive ? 'bg-[var(--accent)]/12 text-[var(--accent)]' : 'bg-[var(--card-soft)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.9} />
                  </span>
                  <span className={`text-[11px] font-semibold transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    {item.label}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </LayoutGroup>
    </nav>
  );
}
