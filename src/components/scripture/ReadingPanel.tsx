'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { TorahAliyah } from '@/lib/models';
import { MinimalReadingDisplay } from '@/components/scripture/MinimalReadingDisplay';
import { AliyahBottomSheet } from '@/components/scripture/AliyahBottomSheet';

interface ReadingPanelProps {
  title?: string;
  eyebrow?: string;
  readings: TorahAliyah[];
  activeReadingId: string;
  translation?: string;
  completedReadingIds?: string[];
  persistenceKey?: string;
  onSelectReading: (readingId: string) => void;
  onToggleCompletion?: (readingId: string) => void;
}

export function ReadingPanel({
  title = 'Readings',
  eyebrow = 'Reading path',
  readings,
  activeReadingId,
  translation = 'kjv',
  completedReadingIds = [],
  persistenceKey,
  onSelectReading,
  onToggleCompletion,
}: ReadingPanelProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  useEffect(() => {
    if (!persistenceKey || !activeReadingId || typeof window === 'undefined') return;
    window.localStorage.setItem(persistenceKey, activeReadingId);
  }, [activeReadingId, persistenceKey]);

  const activeIndex = readings.findIndex((r) => r.id === activeReadingId);
  const active = readings[activeIndex] || readings[0];
  const total = readings.length;

  return (
    <section className="space-y-4 w-full">
      <AliyahBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        readings={readings}
        activeReadingId={activeReadingId}
        onSelectReading={onSelectReading}
      />

      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{title}</h2>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        {/* Aliyah selector (modal trigger) */}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/95 px-4 py-3 text-left text-sm shadow-sm hover:shadow-md active:shadow-sm transition"
          aria-haspopup="dialog"
        >
          <div className="flex min-w-0 flex-col items-start">
            <span className="text-xs text-[var(--text-secondary)]">Current Portion</span>
            <span className="mt-1 truncate font-semibold text-[var(--text-primary)]">{active?.label || 'Select Aliyah'}</span>
          </div>
          <ChevronDown size={18} className="shrink-0" />
        </button>

        {/* Progress indicator */}
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <div className="text-sm text-[var(--text-secondary)]">
            Aliyah {Math.max(1, activeIndex + 1)} of {total}
          </div>
          <div className="flex-1 sm:w-48">
            <div className="h-2 rounded-full bg-slate-800/60">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{ width: `${Math.round(((activeIndex + 1) / Math.max(1, total)) * 100)}%` }}
              />
            </div>
          </div>
          <div className="text-xs text-[var(--text-secondary)]">{Math.round(((activeIndex + 1) / Math.max(1, total)) * 100)}%</div>
        </div>

        {/* Scripture viewer - minimal, manuscript style */}
        <div className="mt-2">
          {active ? (
            <MinimalReadingDisplay
              reading={active}
              translation={translation}
              completed={completedReadingIds.includes(active.id)}
              onToggleCompletion={onToggleCompletion}
              onPrev={() => {
                const prev = readings[Math.max(0, activeIndex - 1)];
                if (prev) onSelectReading(prev.id);
              }}
              onNext={() => {
                const next = readings[Math.min(readings.length - 1, activeIndex + 1)];
                if (next) onSelectReading(next.id);
              }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
