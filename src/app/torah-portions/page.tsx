'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTorahPortion } from '@/hooks/useTorahPortion';
import { useTorahProgress } from '@/hooks/useTorahProgress';
import { TorahHero } from '@/components/torah/TorahHero';

const ScriptureViewer = dynamic(() => import('@/components/torah/ScriptureViewer').then((module) => module.ScriptureViewer), {
  suspense: true,
});

function SectionSkeleton() {
  return (
    <div className="space-y-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="h-8 w-1/3 rounded-full bg-[var(--surface-strong)]" />
      <div className="h-6 w-2/3 rounded-full bg-[var(--surface-strong)]" />
      <div className="space-y-3 pt-4">
        <div className="h-5 w-full rounded-full bg-[var(--surface-strong)]" />
        <div className="h-5 w-5/6 rounded-full bg-[var(--surface-strong)]" />
        <div className="h-5 w-3/4 rounded-full bg-[var(--surface-strong)]" />
      </div>
    </div>
  );
}

export default function TorahPortionsPage() {
  const { user } = useAuth();
  const { portion, loading: portionLoading, error } = useTorahPortion();
  const { progress, saveProgress } = useTorahProgress(user?.uid ?? undefined);
  const [activeAliyahId, setActiveAliyahId] = useState<string>('');
  const [completedAliyot, setCompletedAliyot] = useState<string[]>([]);

  useEffect(() => {
    if (!activeAliyahId) return;
    // smooth-scroll the scripture viewer into view when the active aliyah changes
    try {
      const el = document.getElementById('scripture');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) {
      // ignore in non-browser environments
    }
  }, [activeAliyahId]);

  useEffect(() => {
    if (portion?.aliyot?.length) {
      const saved = window.localStorage.getItem('torah-active-reading');
      setActiveAliyahId(portion.aliyot.some((aliyah) => aliyah.id === saved) ? saved || portion.aliyot[0].id : portion.aliyot[0].id);
    }
  }, [portion]);

  useEffect(() => {
    if (!portion) {
      return;
    }

    const stored = progress[portion.id]?.completedAliyot || [];
    setCompletedAliyot(stored);
  }, [portion, progress]);

  const completionPercent = useMemo(() => {
    if (!portion) return 0;
    const total = portion.aliyot.length;
    return total === 0 ? 0 : Math.round((completedAliyot.length / total) * 100);
  }, [portion, completedAliyot]);

  const handleToggleAliyah = async (aliyahId: string) => {
    if (!portion) return;
    const nextCompleted = completedAliyot.includes(aliyahId)
      ? completedAliyot.filter((id) => id !== aliyahId)
      : [...completedAliyot, aliyahId];

    setCompletedAliyot(nextCompleted);
    if (!user?.uid) return;

    try {
      await saveProgress(portion.id, Math.round((nextCompleted.length / portion.aliyot.length) * 100), nextCompleted);
    } catch {
      // keep optimistic UI but allow later retry
    }
  };

  if (portionLoading) {
    return (
      <div className="space-y-8 py-6">
        <SectionSkeleton />
        <SectionSkeleton />
      </div>
    );
  }

  if (error || !portion) {
    return (
      <div className="space-y-6 py-6">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 text-[var(--text-primary)]">
          <p className="text-lg font-semibold">Unable to load Torah study content.</p>
          <p className="mt-3 text-sm text-[var(--text-muted)]">Please refresh the page or try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-6 sm:px-5">
        <TorahHero portion={portion} progress={completionPercent} />

        <section className="space-y-5">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)] font-semibold">Guided study journey</p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">Move through the portion with calm focus</h2>
            </div>
            <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)]/90 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Portion overview</p>
                  <p className="text-sm leading-7 text-[var(--text-secondary)]">{portion.summary}</p>
                </div>
                <div className="min-w-[140px] rounded-[24px] bg-[var(--surface-soft)] px-3 py-3 text-center text-sm">
                  <p className="font-semibold text-[var(--text-primary)]">{completionPercent}% complete</p>
                  <p className="text-[var(--text-secondary)]">{completedAliyot.length} of {portion.aliyot.length} aliyot</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {portion.themes.slice(0, 4).map((theme) => (
                  <span key={theme} className="rounded-full bg-[var(--surface-soft)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)] font-semibold">Insights</p>
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">Sacred themes to carry with you</h3>
          </div>
          <div className="space-y-4">
            {portion.commentary.slice(0, 2).map((item) => (
              <div key={item.id} className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)]/90 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)] font-semibold">{item.source}</p>
                <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.excerpt}</p>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">{item.reflection}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)] font-semibold">Reflect & pray</p>
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">Bring this portion into your quiet</h3>
          </div>
          <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)]/90 p-5">
            <p className="text-sm leading-7 text-[var(--text-secondary)]">
              Use the reading path above as a calm study guide. Pause after each aliyah, note what moves your heart, and offer a brief prayer of gratitude for the word you received.
            </p>
            <div className="mt-5 space-y-3 rounded-[24px] bg-[var(--surface-soft)] p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Prayer anchor</p>
              <p className="text-sm leading-7 text-[var(--text-secondary)]">
                May the words of this portion shape my mind and steady my steps, helping me live with intention, gratitude, and sacred focus.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)] font-semibold">Immersive reading</p>
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">A living scroll experience</h3>
          </div>
          <div className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)]/90 p-4">
            <Suspense fallback={<SectionSkeleton />}>
              <div className="prose prose-invert max-w-none">
                <ScriptureViewer
                  aliyot={portion.aliyot}
                  activeAliyahId={activeAliyahId}
                  completedAliyotIds={completedAliyot}
                  onSelectAliyah={setActiveAliyahId}
                  onToggleCompletion={handleToggleAliyah}
                />
              </div>
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}

