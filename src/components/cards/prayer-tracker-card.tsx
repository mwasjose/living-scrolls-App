'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUserProfile } from '@/hooks/useUserProfile';
import { updateUserProfile } from '@/services/userService';

interface PrayerTrackerCardProps {
  userId: string;
}

export function PrayerTrackerCard({ userId }: PrayerTrackerCardProps) {
  const { profile, loading: profileLoading } = useUserProfile(userId);
  const [prayedToday, setPrayedToday] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (profile?.prayerConsistency) {
      setPrayedToday(profile.prayerConsistency[today] || false);
    }
  }, [profile, today]);

  const handleTogglePrayer = async () => {
    if (!profile) return;
    const newConsistency = { ...profile.prayerConsistency, [today]: !prayedToday };
    await updateUserProfile(userId, { prayerConsistency: newConsistency });
    setPrayedToday(!prayedToday);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="avast-card rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)] font-semibold">Prayer Consistency</p>
      <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">Have you prayed today?</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">A consistent heart of prayer draws you closer to Adonai.</p>
      <button onClick={handleTogglePrayer} disabled={profileLoading} className={`mt-6 w-full rounded-lg px-4 py-3 text-sm font-semibold transition ${prayedToday ? 'bg-[var(--color-avast-green)] text-[var(--text-inverse)]' : 'bg-[var(--accent)] text-[var(--text-inverse)] hover:bg-[var(--color-avast-cyan-light)]'}`}>
        {prayedToday ? 'Prayer Recorded!' : 'Mark as Prayed'}
      </button>
    </motion.div>
  );
}
