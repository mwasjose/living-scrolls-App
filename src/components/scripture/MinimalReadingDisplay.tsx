'use client';

import { useMemo } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import type { TorahAliyah } from '@/lib/models';
import { useScripturePassage } from '@/hooks/useScripturePassage';
import { ScriptureTextViewer } from '@/components/scripture/ScriptureTextViewer';

interface Props {
  reading: TorahAliyah;
  translation?: string;
  completed?: boolean;
  onToggleCompletion?: (id: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function MinimalReadingDisplay({ reading, translation = 'kjv', completed, onToggleCompletion, onPrev, onNext }: Props) {
  const { passage, loading } = useScripturePassage(reading.reference, translation, true);

  return (
    <article className="mx-auto w-full max-w-4xl">
      <div className="rounded-[18px] bg-[var(--surface)]/80 p-3 sm:p-4 md:p-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold text-[var(--text-primary)] sm:text-xl">{reading.label}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{reading.reference}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="rounded-full p-2 text-[var(--text-secondary)] hover:bg-[var(--surface-soft)] transition"
              aria-label="Previous Aliyah"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-full p-2 text-[var(--text-secondary)] hover:bg-[var(--surface-soft)] transition"
              aria-label="Next Aliyah"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-lg px-3 py-6 sm:px-4 md:px-6 prose prose-invert max-w-none overflow-x-hidden" style={{ lineHeight: 1.9, fontSize: '1.05rem' }}>
          <ScriptureTextViewer
            passage={passage}
            loading={loading}
            fontSize={18}
            storageKey={`torah:${reading.id}:${translation}`}
          />
        </div>

        <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="text-sm text-[var(--text-secondary)]">{reading.hebrewName ?? ''}</div>
          <div>
            {onToggleCompletion ? (
              <button
                type="button"
                onClick={() => onToggleCompletion?.(reading.id)}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-soft)] px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface)] transition whitespace-nowrap"
              >
                <BookOpen size={16} /> {completed ? 'Mark incomplete' : 'Mark complete'}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
