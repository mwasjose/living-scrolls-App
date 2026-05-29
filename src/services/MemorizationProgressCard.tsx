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
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="rounded-[32px] border border-bronze/15 bg-cream/90 p-6 shadow-soft">
      <p className="text-sm uppercase tracking-[0.24em] text-olive">Memorization Progress</p>
      <h3 className="mt-4 text-xl font-semibold text-deep">Your mastery of Scripture.</h3>
      <p className="mt-3 text-sm leading-7 text-deep/80">Continue to hide Adonai&apos;s Word in your heart.</p>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-olive/10">
        <div className="h-full rounded-full bg-gradient-to-r from-gold to-[#f3d58b]" style={{ width: `${averageMastery}%` }} />
      </div>
      <p className="mt-4 text-sm text-deep/70">Average mastery: {averageMastery}% across {totalVerses} verses.</p>
    </motion.div>
  );
}