'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useTorahPortion } from '@/hooks/useTorahPortion';
import { useTorahProgress } from '@/hooks/useTorahProgress';
import { useTorahStore } from '@/hooks/useTorahStore';
import { TorahHero } from '@/components/torah/TorahHero';

const TorahSidebar = dynamic(() => import('@/components/torah/TorahSidebar').then((module) => module.TorahSidebar), {
  suspense: true,
});
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
  const { user, loading: authLoading } = useAuth();
  const { portion, loading: portionLoading, error } = useTorahPortion();
  const { progress, loading: progressLoading, saveProgress } = useTorahProgress(user?.uid ?? undefined);
  const [activeAliyahId, setActiveAliyahId] = useState<string>('');
  const [completedAliyot, setCompletedAliyot] = useState<string[]>([]);

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
    <div className="space-y-8 py-6">
      <TorahHero portion={portion} progress={completionPercent} />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <Suspense fallback={<SectionSkeleton />}>
            <ScriptureViewer
              aliyot={portion.aliyot}
              activeAliyahId={activeAliyahId}
              completedAliyotIds={completedAliyot}
              onSelectAliyah={setActiveAliyahId}
              onToggleCompletion={handleToggleAliyah}
            />
          </Suspense>

        </div>

        <Suspense fallback={<div className="rounded-[32px] border border-bronze/10 bg-cream/90 p-6 shadow-soft">Loading study sidebar...</div>}>
          <TorahSidebar
            portion={portion}
            progress={completionPercent}
            completedCount={completedAliyot.length}
            totalCount={portion.aliyot.length}
            activeAliyahId={activeAliyahId}
            completedAliyotIds={completedAliyot}
            onSelectAliyah={setActiveAliyahId}
          />
        </Suspense>
      </div>
    </div>
  );
}

