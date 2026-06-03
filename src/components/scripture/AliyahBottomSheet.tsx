'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Search } from 'lucide-react';
import type { TorahAliyah } from '@/lib/models';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  readings: TorahAliyah[];
  activeReadingId: string;
  onSelectReading: (id: string) => void;
  showSearch?: boolean;
}

export function AliyahBottomSheet({ isOpen, onClose, readings, activeReadingId, onSelectReading, showSearch = false }: Props) {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // prevent body scroll when sheet open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    // determine preferred color scheme for themed background
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => setIsDark(!!(mq && mq.matches));
    updateTheme();
    mq?.addEventListener?.('change', updateTheme);

    const sizeQuery = window.matchMedia && window.matchMedia('(min-width: 1024px)');
    const updateSize = () => setIsDesktop(!!(sizeQuery && sizeQuery.matches));
    updateSize();
    sizeQuery?.addEventListener?.('change', updateSize);

    return () => {
      mq?.removeEventListener?.('change', updateTheme);
      sizeQuery?.removeEventListener?.('change', updateSize);
    };
  }, []);

  useEffect(() => {
    // focus search when opened
    if (isOpen && showSearch) {
      const input = sheetRef.current?.querySelector('input') as HTMLInputElement | null;
      input?.focus();
    }
  }, [isOpen, showSearch]);

  const filtered = query.trim()
    ? readings.filter((r) => `${r.label} ${r.reference}`.toLowerCase().includes(query.toLowerCase()))
    : readings;

  const activeIndex = Math.max(0, readings.findIndex((r) => r.id === activeReadingId));

  const handleSelect = (id: string) => {
    onSelectReading(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with soft blur + dim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(6,8,5,0.28)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          />

          {/* Bottom sheet / desktop command panel (themed) */}
          <motion.div
            initial={isDesktop ? { opacity: 0, y: 16 } : { y: '100%' }}
            animate={isDesktop ? { opacity: 1, y: 0 } : { y: 0 }}
            exit={isDesktop ? { opacity: 0, y: 16 } : { y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={isDesktop
              ? 'fixed left-1/2 top-1/2 z-50 w-[min(480px,calc(100%-3rem))] -translate-x-1/2 -translate-y-1/2 rounded-3xl px-5 py-4 shadow-[0_18px_60px_rgba(6,8,5,0.25)]'
              : 'fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[calc(100%-1.5rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl px-4 pb-safe pt-3 shadow-xl sm:w-[480px]'
            }
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            style={isDark ? {
              background: 'linear-gradient(180deg, rgba(24,31,21,0.98), rgba(18,24,16,0.96))',
              border: '1px solid rgba(255,255,255,0.05)',
              boxShadow: isDesktop ? '0 20px 60px rgba(3,6,3,0.26), 0 0 0 1px rgba(16,185,129,0.04)' : '0 8px 30px rgba(10,12,8,0.55), 0 2px 8px rgba(16,185,129,0.04)'
            } : {
              background: 'linear-gradient(180deg, #faf7f0, #f5f1e8)',
              border: '1px solid rgba(34,30,22,0.08)',
              boxShadow: isDesktop ? '0 20px 60px rgba(14,12,10,0.10)' : '0 8px 30px rgba(14,12,10,0.08)'
            }}
          >
            <div className="mx-auto max-w-2xl">
              {/* Drag handle */}
              <div className="mx-auto mb-3 h-0.5 w-12 rounded-full bg-[var(--surface-soft)]/60" />

              {/* Header - compact context */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Choose Aliyah</p>
                  <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                    <div className="truncate">{readings[activeIndex]?.reference}</div>
                    <div className="mt-0.5 text-xs text-[var(--text-secondary)]">Current: {readings[activeIndex]?.label}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-2 text-[var(--text-secondary)] hover:bg-[var(--surface-soft)] transition"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Progress */}
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="text-xs text-[var(--text-secondary)]">Aliyah {activeIndex + 1} of {readings.length}</div>
                <div className="flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800/60">
                    <div className="h-full rounded-full bg-[var(--accent)] transition-all" style={{ width: `${Math.round(((activeIndex + 1) / Math.max(1, readings.length)) * 100)}%` }} />
                  </div>
                </div>
              </div>

              {/* Optional search */}
              {showSearch ? (
                <div className="mt-3 flex w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2">
                  <Search size={16} className="text-[var(--text-secondary)]" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search aliyah..."
                    className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none"
                    aria-label="Search aliyah"
                  />
                </div>
              ) : null}

              <div className="mt-3 max-h-[56vh] overflow-y-auto">
                <ul className="space-y-1">
                  {filtered.map((reading, i) => {
                    const isActive = reading.id === activeReadingId;
                    return (
                      <li key={reading.id}>
                        <button
                          type="button"
                          onClick={() => handleSelect(reading.id)}
                          className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition ${isActive ? 'bg-[var(--accent-soft)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-soft)]'}`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium text-sm">{reading.label}</div>
                            <div className="mt-0.5 text-xs text-[var(--text-secondary)]">{reading.reference}</div>
                          </div>
                          <div className="shrink-0 flex items-center gap-2">
                            {isActive ? (
                              <span className="inline-flex items-center rounded-full bg-[var(--surface-soft)] px-2 py-1 text-xs text-[var(--text-secondary)]">
                                <Check size={14} className="text-[var(--accent)]" />
                              </span>
                            ) : null}
                            <span className="text-xs text-[var(--text-secondary)]">{i + 1}/{readings.length}</span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Safe area spacer */}
              <div className="h-safe mt-4" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
