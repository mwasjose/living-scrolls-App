'use client';

import { motion } from 'framer-motion';
import { useUserProfile } from '@/hooks/useUserProfile';

interface MemorizationProgressCardProps {
  userId: string;
}

export function MemorizationProgressCard({ userId }: MemorizationProgressCardProps) {
  const { profile, loading } = useUserProfile(userId);

  // Calculate overall memorization progress (simple average for now)
  const memorizationProgress: Record<string, number> = profile?.memorizationProgress ?? {};
  const totalVerses = Object.keys(memorizationProgress).length;
  const totalMastery = Object.values(memorizationProgress).reduce((sum, val) => sum + val, 0);
  const averageMastery = totalVerses > 0 ? Math.round(totalMastery / totalVerses) : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="avast-card rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)] font-semibold">Memorization Progress</p>
      <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">Your mastery of Scripture.</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">Continue to hide Adonai&apos;s Word in your heart.</p>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-[var(--surface-strong)]">
        <div className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--color-avast-cyan-light)]" style={{ width: `${averageMastery}%` }} />
      </div>
      <p className="mt-4 text-sm text-[var(--text-muted)]">Average mastery: {averageMastery}% across {totalVerses} verses.</p>
    </motion.div>
  );
}
