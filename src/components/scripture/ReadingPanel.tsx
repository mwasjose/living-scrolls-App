'use client';

import { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import type { TorahAliyah } from '@/lib/models';
import { ExpandableReadingCard } from '@/components/scripture/ExpandableReadingCard';

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
  useEffect(() => {
    if (!persistenceKey || !activeReadingId || typeof window === 'undefined') return;
    window.localStorage.setItem(persistenceKey, activeReadingId);
  }, [activeReadingId, persistenceKey]);

  return (
    <section className="space-y-6 rounded-[32px] border border-sacred bg-sacred-cream p-5 shadow-soft sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">{eyebrow}</p>
          <h2 className="section-title mt-2 text-3xl text-sacred-primary">{title}</h2>
        </div>
        <p className="rounded-full border border-sacred bg-sacred-cream px-4 py-2 text-sm text-muted">
          {readings.length} readings - {translation.toUpperCase()}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-sacred bg-sacred-cream p-3 lg:sticky lg:top-[120px] lg:self-start">
          <p className="px-2 text-xs uppercase tracking-[0.3em] text-secondary">Path</p>
          <div className="mt-3 space-y-1">
            {readings.map((reading) => {
              const active = reading.id === activeReadingId;
              return (
                <button
                  type="button"
                  key={reading.id}
                  onClick={() => onSelectReading(reading.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition ${
                    active ? 'bg-gold/10 text-sacred-primary ring-1 ring-gold/30' : 'text-muted hover:bg-olive/10 hover:text-sacred-primary'
                  }`}
                >
                  <span>
                    <span className="block font-semibold">{reading.label}</span>
                    <span className="block text-xs text-muted">{reading.reference}</span>
                  </span>
                  <ChevronRight className={`shrink-0 text-secondary transition ${active ? 'translate-x-1' : ''}`} size={16} />
                </button>
              );
            })}
          </div>
        </aside>

        <div className="space-y-4">
          {readings
            .filter((reading) => reading.id === activeReadingId)
            .map((reading) => (
              <ExpandableReadingCard
                key={reading.id}
                reading={reading}
                active={reading.id === activeReadingId}
                translation={translation}
                completed={completedReadingIds.includes(reading.id)}
                onOpen={onSelectReading}
                onToggleCompletion={onToggleCompletion}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
